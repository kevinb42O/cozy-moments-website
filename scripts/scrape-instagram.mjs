#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createHash } from 'node:crypto';

const PROJECT_ROOT = process.cwd();
const OUTPUT_MODULE = path.join(PROJECT_ROOT, 'src/data/instagramPosts.ts');
const OUTPUT_RAW = path.join(PROJECT_ROOT, 'src/data/instagramRawSnapshot.json');
const MEDIA_OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/instagram');

const loadEnvFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex <= 0) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      if (!key || process.env[key] !== undefined) continue;

      const unquoted =
        (rawValue.startsWith('"') && rawValue.endsWith('"')) || (rawValue.startsWith("'") && rawValue.endsWith("'"))
          ? rawValue.slice(1, -1)
          : rawValue;

      process.env[key] = unquoted;
    }
  } catch {
    // ignore missing env file
  }
};

await loadEnvFile(path.join(PROJECT_ROOT, '.env.local'));
await loadEnvFile(path.join(PROJECT_ROOT, '.env'));

const DEBUG = process.argv.includes('--debug');
const USERNAME = process.env.INSTAGRAM_USERNAME?.trim();
const SESSION_ID = process.env.INSTAGRAM_SESSIONID?.trim();
const COOKIE_HEADER_RAW = process.env.INSTAGRAM_COOKIE_HEADER?.trim();
const CSRFTOKEN = process.env.INSTAGRAM_CSRFTOKEN?.trim();
const DS_USER_ID = process.env.INSTAGRAM_DS_USER_ID?.trim();
const IG_DID = process.env.INSTAGRAM_IG_DID?.trim();
const RUR = process.env.INSTAGRAM_RUR?.trim();
const MID = process.env.INSTAGRAM_MID?.trim();
const DATR = process.env.INSTAGRAM_DATR?.trim();
const POST_LIMIT = Number.parseInt(process.env.INSTAGRAM_POST_LIMIT ?? '12', 10);
const DOWNLOAD_MEDIA = (process.env.INSTAGRAM_DOWNLOAD_MEDIA ?? 'true').toLowerCase() !== 'false';

const DEFAULT_HEADERS = {
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
};

const TRANSIENT_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const GRAPH_QUERY_HASHES = ['e769aa130647d2354c40ea6a439bfc08', '69cba40317214236af40e7efa697781d'];

/** @typedef {'image' | 'video' | 'album'} InstagramMediaType */

/**
 * @typedef {Object} InstagramPost
 * @property {string} id
 * @property {string} shortcode
 * @property {string} permalink
 * @property {string} caption
 * @property {string} timestamp
 * @property {InstagramMediaType} mediaType
 * @property {string} thumbnailUrl
 * @property {string} mediaUrl
 */

const clampPostLimit = (value) => {
  if (Number.isNaN(value) || value <= 0) return 12;
  return Math.min(value, 500);
};

const sanitizedPostLimit = clampPostLimit(POST_LIMIT);

const log = (message) => {
  console.log(`[instagram-scrape] ${message}`);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isTransientError = (error) => {
  if (!error || typeof error !== 'object') return false;
  if ('statusCode' in error && TRANSIENT_STATUS_CODES.has(error.statusCode)) return true;
  if ('code' in error && (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET')) return true;
  return false;
};

const fetchJson = async (url, headers = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = new Error(`Request failed with HTTP ${response.status}: ${url}`);
      error.statusCode = response.status;
      throw error;
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const withRetries = async (taskName, fn, retries = 3) => {
  let attempt = 0;

  while (true) {
    attempt += 1;

    try {
      return await fn();
    } catch (error) {
      const canRetry = isTransientError(error) && attempt < retries;
      const reason = error instanceof Error ? error.message : String(error);

      if (!canRetry) {
        throw error;
      }

      const backoffMs = 500 * Math.pow(2, attempt - 1);
      log(`${taskName} attempt ${attempt} failed (${reason}). Retrying in ${backoffMs}ms.`);
      await wait(backoffMs);
    }
  }
};

const buildCookieHeader = () => {
  if (COOKIE_HEADER_RAW) {
    return COOKIE_HEADER_RAW;
  }

  const cookies = [];

  if (SESSION_ID) {
    let normalized = SESSION_ID;
    if (SESSION_ID.includes('%')) {
      try {
        normalized = decodeURIComponent(SESSION_ID);
      } catch {
        normalized = SESSION_ID;
      }
    }

    cookies.push(`sessionid=${normalized}`);
  }

  if (CSRFTOKEN) cookies.push(`csrftoken=${CSRFTOKEN}`);
  if (DS_USER_ID) cookies.push(`ds_user_id=${DS_USER_ID}`);
  if (IG_DID) cookies.push(`ig_did=${IG_DID}`);
  if (RUR) cookies.push(`rur=${RUR}`);
  if (MID) cookies.push(`mid=${MID}`);
  if (DATR) cookies.push(`datr=${DATR}`);

  if (cookies.length === 0) return undefined;

  return cookies.join('; ');
};

const buildRequestHeaders = (username, extraHeaders = {}) => {
  const cookie = buildCookieHeader();

  return {
    'x-ig-app-id': '936619743392459',
    'x-requested-with': 'XMLHttpRequest',
    ...(CSRFTOKEN ? { 'x-csrftoken': CSRFTOKEN } : {}),
    ...(cookie ? { cookie } : {}),
    referer: `https://www.instagram.com/${encodeURIComponent(username)}/`,
    ...extraHeaders,
  };
};

const buildPermalink = (shortcode, username) => {
  if (shortcode) return `https://www.instagram.com/p/${shortcode}/`;
  if (username) return `https://www.instagram.com/${username}/`;
  return 'https://www.instagram.com/';
};

const normalizeMediaType = (node) => {
  if (node?.__typename === 'GraphSidecar') return 'album';
  if (node?.is_video) return 'video';
  return 'image';
};

const extractImageCandidates = (node) => {
  const urls = new Set();
  const addUrl = (value) => {
    if (typeof value === 'string' && value.length > 0) {
      urls.add(value);
    }
  };

  addUrl(node?.display_url);
  addUrl(node?.thumbnail_src);

  const sidecarEdges = node?.edge_sidecar_to_children?.edges;
  if (Array.isArray(sidecarEdges)) {
    for (const edge of sidecarEdges) {
      addUrl(edge?.node?.display_url);
      addUrl(edge?.node?.thumbnail_src);
    }
  }

  return Array.from(urls);
};

const normalizeNode = (node) => {
  const captionEdges = node?.edge_media_to_caption?.edges;
  const caption = Array.isArray(captionEdges) && captionEdges.length > 0 ? captionEdges[0]?.node?.text ?? '' : '';

  const shortcode = node?.shortcode ?? '';
  const thumbnailUrl = node?.thumbnail_src ?? node?.display_url ?? '';
  const mediaUrl = node?.display_url ?? thumbnailUrl;
  const imageCandidates = extractImageCandidates(node);

  /** @type {InstagramPost} */
  const post = {
    id: String(node?.id ?? shortcode),
    shortcode,
    permalink: buildPermalink(shortcode, USERNAME),
    caption,
    timestamp: new Date((node?.taken_at_timestamp ?? 0) * 1000).toISOString(),
    mediaType: normalizeMediaType(node),
    thumbnailUrl,
    mediaUrl,
  };

  return {
    post,
    imageCandidates,
  };
};

const getTimelineFromPayload = (payload) =>
  payload?.data?.user?.edge_owner_to_timeline_media ?? payload?.graphql?.user?.edge_owner_to_timeline_media ?? null;

const getUserFromPayload = (payload) => payload?.data?.user ?? payload?.graphql?.user ?? null;

const normalizeNodes = (nodes) => {
  const normalized = nodes
    .map((node) => normalizeNode(node))
    .filter((entry) => Boolean(entry.post.id && entry.post.thumbnailUrl));

  return normalized;
};

const normalizeApiV1Items = (payload) => {
  const items = payload?.items ?? [];

  const entries = items
    .map((item) => {
      const shortcode = item?.code ?? '';
      const thumbnailUrl =
        item?.image_versions2?.candidates?.[0]?.url ?? item?.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url ?? '';

      const candidateUrls = [];
      const pushCandidate = (value) => {
        if (typeof value === 'string' && value.length > 0) {
          candidateUrls.push(value);
        }
      };

      const imageCandidates = item?.image_versions2?.candidates ?? [];
      for (const candidate of imageCandidates) {
        pushCandidate(candidate?.url);
      }

      const carouselItems = item?.carousel_media ?? [];
      for (const carouselItem of carouselItems) {
        const carouselCandidates = carouselItem?.image_versions2?.candidates ?? [];
        for (const candidate of carouselCandidates) {
          pushCandidate(candidate?.url);
        }
      }

      /** @type {InstagramPost} */
      const post = {
        id: String(item?.id ?? item?.pk ?? shortcode),
        shortcode,
        permalink: buildPermalink(shortcode, USERNAME),
        caption: item?.caption?.text ?? '',
        timestamp: new Date((item?.taken_at ?? 0) * 1000).toISOString(),
        mediaType: item?.media_type === 8 ? 'album' : item?.media_type === 2 ? 'video' : 'image',
        thumbnailUrl,
        mediaUrl: thumbnailUrl,
      };

      return {
        post,
        imageCandidates: candidateUrls,
      };
    })
    .filter((entry) => Boolean(entry.post.id && entry.post.thumbnailUrl));

  return entries;
};

const normalizeRawPayload = (payload) => {
  const timelineEdges =
    payload?.data?.user?.edge_owner_to_timeline_media?.edges ??
    payload?.graphql?.user?.edge_owner_to_timeline_media?.edges ??
    [];

  return normalizeNodes(timelineEdges.map((edge) => edge?.node))
    .slice(0, sanitizedPostLimit);
};

const fetchViaWebProfileInfo = async (username) => {
  const endpoints = [
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
  ];
  const errors = [];

  for (const endpoint of endpoints) {
    try {
      const payload = await withRetries('web_profile_info', () => fetchJson(endpoint, buildRequestHeaders(username)));
      const isValid = Boolean(payload?.data?.user);
      const hasTimeline = (getTimelineFromPayload(payload)?.edges?.length ?? 0) > 0;
      if (isValid && hasTimeline) {
        return {
          source: endpoint.includes('i.instagram.com') ? 'i_web_profile_info' : 'web_profile_info',
          payload,
          kind: 'timeline',
        };
      }

      if (isValid && !hasTimeline) {
        throw new Error('web_profile_info returned user data but no timeline edges.');
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      errors.push(reason);
    }
  }

  throw new Error(`web_profile_info failed. ${errors.join(' | ')}`);
};

const fetchViaGraphQl = async (username) => {
  const endpoint = `https://www.instagram.com/${encodeURIComponent(username)}/?__a=1&__d=dis`;

  const payload = await withRetries('profile_graphql', () =>
    fetchJson(endpoint, buildRequestHeaders(username)),
  );

  const isValid = Boolean(payload?.graphql?.user || payload?.data?.user);
  const hasTimeline = (getTimelineFromPayload(payload)?.edges?.length ?? 0) > 0;
  if (!isValid || !hasTimeline) {
    throw new Error('GraphQL profile response did not include user data.');
  }

  return {
    source: 'profile_graphql',
    payload,
    kind: 'timeline',
  };
};

const fetchViaApiV1Feed = async (username) => {
  const items = [];
  let maxId = null;

  while (items.length < sanitizedPostLimit) {
    const baseEndpoint = `https://i.instagram.com/api/v1/feed/user/${encodeURIComponent(username)}/username/?count=50`;
    const endpoint = maxId ? `${baseEndpoint}&max_id=${encodeURIComponent(maxId)}` : baseEndpoint;

    const payload = await withRetries('api_v1_feed', () => fetchJson(endpoint, buildRequestHeaders(username)));
    const pageItems = payload?.items ?? [];
    items.push(...pageItems);

    const nextMaxId = payload?.next_max_id ?? null;
    if (!nextMaxId || pageItems.length === 0) {
      break;
    }
    maxId = nextMaxId;
  }

  if (items.length === 0) {
    throw new Error('api_v1_feed returned zero items.');
  }

  return {
    source: 'api_v1_feed_username',
    payload: { items: items.slice(0, sanitizedPostLimit) },
    kind: 'api-items',
  };
};

const fetchTimelinePage = async (userId, endCursor, username) => {
  const variables = encodeURIComponent(
    JSON.stringify({
      id: userId,
      first: 50,
      after: endCursor,
    }),
  );

  const errors = [];

  for (const queryHash of GRAPH_QUERY_HASHES) {
    const endpoint = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables=${variables}`;

    try {
      const payload = await withRetries('timeline_graphql_page', () =>
        fetchJson(endpoint, buildRequestHeaders(username)),
      );

      if (getTimelineFromPayload(payload)) {
        return payload;
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      errors.push(reason);
    }
  }

  throw new Error(`Could not fetch timeline page for cursor ${endCursor}. ${errors.join(' | ')}`);
};

const collectAllTimelineNodes = async (initialPayload, username) => {
  const user = getUserFromPayload(initialPayload);
  const initialTimeline = getTimelineFromPayload(initialPayload);

  if (!user || !initialTimeline) {
    throw new Error('Initial payload did not contain timeline data.');
  }

  const userId = user?.id;
  if (!userId) {
    throw new Error('Initial payload did not include user id for pagination.');
  }

  const nodes = (initialTimeline?.edges ?? []).map((edge) => edge?.node).filter(Boolean);
  let hasNextPage = Boolean(initialTimeline?.page_info?.has_next_page);
  let endCursor = initialTimeline?.page_info?.end_cursor ?? null;

  while (hasNextPage && endCursor && nodes.length < sanitizedPostLimit) {
    const pagePayload = await fetchTimelinePage(userId, endCursor, username);
    const pageTimeline = getTimelineFromPayload(pagePayload);
    if (!pageTimeline) {
      break;
    }

    const pageNodes = (pageTimeline?.edges ?? []).map((edge) => edge?.node).filter(Boolean);
    nodes.push(...pageNodes);
    hasNextPage = Boolean(pageTimeline?.page_info?.has_next_page);
    endCursor = pageTimeline?.page_info?.end_cursor ?? null;
  }

  return nodes.slice(0, sanitizedPostLimit);
};

const hashUrl = (value) => createHash('sha1').update(value).digest('hex').slice(0, 10);

const inferExtension = (url) => {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
      return ext === '.jpeg' ? '.jpg' : ext;
    }
  } catch {
    // ignore parse failure
  }

  return '.jpg';
};

const fetchBuffer = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      headers: DEFAULT_HEADERS,
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = new Error(`Media request failed with HTTP ${response.status}: ${url}`);
      error.statusCode = response.status;
      throw error;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
      throw new Error(`Non-image media skipped (${contentType || 'unknown'}): ${url}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } finally {
    clearTimeout(timeout);
  }
};

const ensureMediaDir = async () => {
  await fs.mkdir(MEDIA_OUTPUT_DIR, { recursive: true });
};

const toPublicInstagramPath = (filename) => `/instagram/${filename}`;

const downloadImage = async (url, basename) => {
  const ext = inferExtension(url);
  const filename = `${basename}${ext}`;
  const targetPath = path.join(MEDIA_OUTPUT_DIR, filename);

  try {
    await fs.access(targetPath);
    return toPublicInstagramPath(filename);
  } catch {
    // continue and download
  }

  const buffer = await withRetries('download_media', () => fetchBuffer(url), 3);
  await fs.writeFile(targetPath, buffer);
  return toPublicInstagramPath(filename);
};

const downloadPostImages = async (entries) => {
  if (!DOWNLOAD_MEDIA) {
    return entries.map((entry) => entry.post);
  }

  await ensureMediaDir();
  const downloaded = [];

  for (const entry of entries) {
    const post = { ...entry.post };
    const candidates = entry.imageCandidates.length > 0 ? entry.imageCandidates : [post.mediaUrl, post.thumbnailUrl];

    const localUrls = [];
    for (const [index, candidate] of candidates.entries()) {
      if (!candidate) continue;
      try {
        const basename = `${post.shortcode || post.id}-${index + 1}-${hashUrl(candidate)}`;
        const localUrl = await downloadImage(candidate, basename);
        localUrls.push(localUrl);
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        log(`Skipping image candidate for ${post.shortcode}: ${reason}`);
      }
    }

    if (localUrls.length > 0) {
      post.thumbnailUrl = localUrls[0];
      post.mediaUrl = localUrls[0];
    }

    downloaded.push(post);
  }

  return downloaded;
};

const scrapeInstagram = async (username) => {
  const attempts = [fetchViaWebProfileInfo, fetchViaGraphQl, fetchViaApiV1Feed];
  const errors = [];

  for (const attempt of attempts) {
    try {
      return await attempt(username);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      errors.push(reason);
      log(`Endpoint fallback triggered: ${reason}`);
    }
  }

  throw new Error(`All scrape strategies failed. ${errors.join(' | ')}`);
};

const escapeForTemplateLiteral = (value) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

const toDataModuleContent = (meta, posts) => {
  const postLines = posts
    .map((post) => {
      const caption = escapeForTemplateLiteral(post.caption);
      return [
        '    {',
        `      id: ${JSON.stringify(post.id)},`,
        `      shortcode: ${JSON.stringify(post.shortcode)},`,
        `      permalink: ${JSON.stringify(post.permalink)},`,
        `      caption: \`${caption}\`,`,
        `      timestamp: ${JSON.stringify(post.timestamp)},`,
        `      mediaType: ${JSON.stringify(post.mediaType)},`,
        `      thumbnailUrl: ${JSON.stringify(post.thumbnailUrl)},`,
        `      mediaUrl: ${JSON.stringify(post.mediaUrl)}`,
        '    }',
      ].join('\n');
    })
    .join(',\n');

  return [
    "import type { InstagramFeedData } from '../types/instagram';",
    '',
    'export const instagramFeedData: InstagramFeedData = {',
    '  meta: {',
    `    username: ${JSON.stringify(meta.username)},`,
    `    fetchedAt: ${JSON.stringify(meta.fetchedAt)},`,
    `    source: ${JSON.stringify(meta.source)},`,
    `    postLimit: ${meta.postLimit},`,
    `    stale: ${meta.stale},`,
    meta.staleReason ? `    staleReason: ${JSON.stringify(meta.staleReason)}` : '    staleReason: undefined',
    '  },',
    '  posts: [',
    postLines,
    '  ]',
    '};',
    '',
  ].join('\n');
};

const writeRawSnapshot = async (source, payload) => {
  const content = JSON.stringify(
    {
      source,
      capturedAt: new Date().toISOString(),
      payload,
    },
    null,
    2,
  );

  await fs.writeFile(OUTPUT_RAW, content, 'utf8');
};

const hasExistingDataset = async () => {
  try {
    await fs.access(OUTPUT_MODULE);
    return true;
  } catch {
    return false;
  }
};

const run = async () => {
  if (!USERNAME) {
    throw new Error('INSTAGRAM_USERNAME is required. Example: INSTAGRAM_USERNAME=cozymoments_blankenberge npm run scrape:instagram');
  }

  log(`Scraping @${USERNAME} (limit ${sanitizedPostLimit})`);

  const { source, payload, kind } = await scrapeInstagram(USERNAME);

  let normalizedEntries;
  if (kind === 'api-items') {
    normalizedEntries = normalizeApiV1Items(payload);
  } else {
    const timelineNodes = await collectAllTimelineNodes(payload, USERNAME);
    normalizedEntries = normalizeNodes(timelineNodes);
  }

  let posts = normalizedEntries.slice(0, sanitizedPostLimit).map((entry) => entry.post);
  if (DOWNLOAD_MEDIA) {
    log(`Downloading images for ${posts.length} posts into public/instagram`);
    posts = await downloadPostImages(normalizedEntries.slice(0, sanitizedPostLimit));
  }

  if (posts.length === 0) {
    throw new Error('Scraper returned zero valid posts after normalization.');
  }

  const now = new Date().toISOString();
  const moduleContent = toDataModuleContent(
    {
      username: USERNAME,
      fetchedAt: now,
      source,
      postLimit: sanitizedPostLimit,
      stale: false,
      staleReason: undefined,
    },
    posts,
  );

  await fs.writeFile(OUTPUT_MODULE, moduleContent, 'utf8');
  await writeRawSnapshot(source, payload);

  log(`Saved ${posts.length} posts to src/data/instagramPosts.ts`);

  if (DEBUG) {
    log('Debug mode enabled: raw snapshot written to src/data/instagramRawSnapshot.json');
  }
};

run().catch(async (error) => {
  const reason = error instanceof Error ? error.message : String(error);
  const hasDataset = await hasExistingDataset();

  log(`Scrape failed: ${reason}`);

  if (hasDataset) {
    log('Keeping last successful dataset in src/data/instagramPosts.ts so build can proceed.');
    process.exit(0);
  }

  log('No previous dataset found. Failing because app has no Instagram data fallback file.');
  process.exit(1);
});
