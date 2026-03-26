export type InstagramMediaType = 'image' | 'video' | 'album';

export interface InstagramPost {
  id: string;
  shortcode: string;
  permalink: string;
  caption: string;
  timestamp: string;
  mediaType: InstagramMediaType;
  thumbnailUrl: string;
  mediaUrl: string;
}

export interface InstagramFeedMeta {
  username: string;
  fetchedAt: string;
  source: string;
  postLimit: number;
  stale: boolean;
  staleReason?: string;
}

export interface InstagramFeedData {
  meta: InstagramFeedMeta;
  posts: InstagramPost[];
}
