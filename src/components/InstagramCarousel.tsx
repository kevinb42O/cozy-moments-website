import { useEffect, useMemo, useRef, useState, type KeyboardEventHandler, type TouchEventHandler } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  ExternalLink,
  Facebook,
  Heart,
  House,
  Instagram,
  MessageCircle,
  Search,
  UserRound,
} from 'lucide-react';
import type { InstagramPost } from '../types/instagram';

interface InstagramCarouselProps {
  posts: InstagramPost[];
  username: string;
  autoplay?: boolean;
  autoplayIntervalMs?: number;
  staleReason?: string;
  stale?: boolean;
}

const SWIPE_THRESHOLD = 40;
const SLIDE_DURATION_MS = 420;

const formatDate = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('nl-BE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const captionPreview = (text: string) => {
  if (!text) return 'Bekijk deze post op Instagram.';
  if (text.length <= 120) return text;
  return `${text.slice(0, 117).trimEnd()}...`;
};

const InstagramCarousel = ({
  posts,
  username,
  autoplay = true,
  autoplayIntervalMs = 4000,
  stale = false,
  staleReason,
}: InstagramCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [renderIndex, setRenderIndex] = useState(0);
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const slideRafRef = useRef<number | null>(null);
  const slideTimeoutRef = useRef<number | null>(null);
  const [currentTime, setCurrentTime] = useState(
    new Intl.DateTimeFormat('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()),
  );

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Intl.DateTimeFormat('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()),
      );
    };

    updateClock();
    const id = window.setInterval(updateClock, 60000);
    return () => window.clearInterval(id);
  }, []);

  const totalSlides = posts.length;

  useEffect(() => {
    if (activeIndex >= totalSlides && totalSlides > 0) {
      setActiveIndex(totalSlides - 1);
    }
  }, [activeIndex, totalSlides]);

  useEffect(() => {
    if (renderIndex >= totalSlides && totalSlides > 0) {
      setRenderIndex(totalSlides - 1);
    }
  }, [renderIndex, totalSlides]);

  const goToSlide = (nextIndex: number) => {
    if (totalSlides === 0) return;
    if (isSliding) return;

    const wrapped = ((nextIndex % totalSlides) + totalSlides) % totalSlides;
    setActiveIndex(wrapped);
  };

  const goToNextSlide = () => {
    goToSlide(activeIndex + 1);
  };

  const goToPreviousSlide = () => {
    goToSlide(activeIndex - 1);
  };

  useEffect(() => {
    if (posts.length === 0) {
      setRenderIndex(0);
      setFromIndex(0);
      setToIndex(null);
      setIsSliding(false);
      return;
    }

    if (activeIndex === renderIndex) return;

    if (slideRafRef.current !== null) {
      window.cancelAnimationFrame(slideRafRef.current);
      slideRafRef.current = null;
    }
    if (slideTimeoutRef.current !== null) {
      window.clearTimeout(slideTimeoutRef.current);
      slideTimeoutRef.current = null;
    }

    setFromIndex(renderIndex);
    setToIndex(activeIndex);
    setIsSliding(false);

    slideRafRef.current = window.requestAnimationFrame(() => {
      setIsSliding(true);
      slideRafRef.current = null;
    });

    slideTimeoutRef.current = window.setTimeout(() => {
      setRenderIndex(activeIndex);
      setToIndex(null);
      setIsSliding(false);
      slideTimeoutRef.current = null;
    }, SLIDE_DURATION_MS);

    return () => {
      if (slideRafRef.current !== null) {
        window.cancelAnimationFrame(slideRafRef.current);
        slideRafRef.current = null;
      }
      if (slideTimeoutRef.current !== null) {
        window.clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = null;
      }
    };
  }, [activeIndex, renderIndex, posts]);

  const previewPosts = useMemo(() => {
    if (posts.length < 2) return [];

    const wrapIndex = (index: number) => ((index % posts.length) + posts.length) % posts.length;
    const used = new Set<number>([activeIndex]);
    const previews: Array<{ post: InstagramPost; side: 'left' | 'right'; depth: 1 | 2 }> = [];

    for (let step = 1; step < posts.length && previews.length < 4; step += 1) {
      const leftIndex = wrapIndex(activeIndex - step);
      if (!used.has(leftIndex)) {
        used.add(leftIndex);
        previews.push({
          post: posts[leftIndex],
          side: 'left',
          depth: step > 1 ? 2 : 1,
        });
      }

      if (previews.length >= 4) break;

      const rightIndex = wrapIndex(activeIndex + step);
      if (!used.has(rightIndex)) {
        used.add(rightIndex);
        previews.push({
          post: posts[rightIndex],
          side: 'right',
          depth: step > 1 ? 2 : 1,
        });
      }
    }

    return previews;
  }, [activeIndex, posts]);

  useEffect(() => {
    if (!autoplay || totalSlides <= 1) return;

    const id = window.setInterval(() => {
      if (isSliding) return;
      setActiveIndex((previous) => (previous + 1) % totalSlides);
    }, autoplayIntervalMs);

    return () => window.clearInterval(id);
  }, [autoplay, autoplayIntervalMs, isSliding, totalSlides]);

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNextSlide();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPreviousSlide();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      goToSlide(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      goToSlide(totalSlides - 1);
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    setSwipeStart(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd: TouchEventHandler<HTMLElement> = (event) => {
    if (swipeStart === null) return;

    const end = event.changedTouches[0]?.clientX ?? swipeStart;
    const deltaX = end - swipeStart;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) goToNextSlide();
      if (deltaX > 0) goToPreviousSlide();
    }

    setSwipeStart(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center" aria-label="Instagram feed wordt geladen">
        <div className="h-[680px] w-[318px] rounded-[3.2rem] border-[10px] border-zinc-900 bg-coffee-200/70 animate-pulse shadow-2xl" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-coffee-300 bg-coffee-50 px-6 py-8 text-center shadow-sm">
        <p className="text-coffee-700 font-medium">Er zijn momenteel geen Instagram posts beschikbaar.</p>
        <a
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-coffee-900 px-5 py-2.5 text-sm font-semibold text-latte-100 transition hover:bg-coffee-800"
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noreferrer"
        >
          Bekijk Instagram profiel
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    );
  }

  const basePostIndex = toIndex !== null ? fromIndex : renderIndex;
  const basePost = posts[basePostIndex] ?? null;
  const enteringPost = toIndex !== null ? (posts[toIndex] ?? null) : null;
  const shouldAnimateSlide = isSliding && toIndex !== null;
  const visiblePostIndex = isSliding ? (toIndex ?? renderIndex) : renderIndex;
  const visiblePost = posts[visiblePostIndex] ?? null;

  if (!basePost || !visiblePost) {
    return null;
  }

  return (
    <section
      className="space-y-8"
      aria-label={`Instagram carousel van @${username}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {stale ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">Instagram data is mogelijk verouderd.</p>
          {staleReason ? <p>{staleReason}</p> : null}
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-[2rem] border border-coffee-200 bg-[#F6F4F0] px-4 py-12 sm:px-8 sm:py-16 shadow-[0_35px_90px_rgba(22,55,50,0.16)]">
        <div className="absolute left-4 top-4 z-10 hidden md:flex">
          <a
            href={`https://www.instagram.com/${username}/`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(130deg,#f9ce34_0%,#ee2a7b_52%,#6228d7_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(98,40,215,0.26)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(238,42,123,0.34)]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 backdrop-blur-sm transition group-hover:bg-white/30">
              <Instagram size={15} aria-hidden="true" />
            </span>
            Instagram
          </a>
        </div>

        <div className="absolute right-4 top-4 z-10 hidden md:flex">
          <a
            href="https://www.facebook.com/profile.php?id=61576070607157"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(24,119,242,0.28)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#166FE0] hover:shadow-[0_14px_28px_rgba(24,119,242,0.34)]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 backdrop-blur-sm transition group-hover:bg-white/30">
              <Facebook size={15} aria-hidden="true" />
            </span>
            Facebook
          </a>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 items-center justify-center lg:flex" style={{ perspective: '1200px' }}>
          {previewPosts.map(({ post, side, depth }) => {
            const transform =
              side === 'left'
                ? depth === 1
                  ? 'translateX(-335px) rotateY(34deg) scale(0.92)'
                  : 'translateX(-540px) rotateY(52deg) scale(0.82)'
                : depth === 1
                  ? 'translateX(335px) rotateY(-34deg) scale(0.92)'
                  : 'translateX(540px) rotateY(-52deg) scale(0.82)';
            const isNear = depth === 1;
            const opacity = isNear ? 0.52 : 0.2;
            const filter = isNear
              ? 'blur(0.2px) saturate(0.92) brightness(0.86)'
              : 'blur(1px) saturate(0.78) brightness(0.72)';
            const boxShadow = isNear
              ? '0 22px 36px rgba(20, 34, 32, 0.28)'
              : '0 14px 26px rgba(20, 34, 32, 0.2)';

            return (
              <div
                key={`preview-${post.id}-${side}-${depth}`}
                className="absolute h-[300px] w-[210px] overflow-hidden rounded-2xl border border-coffee-300/60 bg-coffee-900/10 shadow-2xl backdrop-blur-[1px]"
                style={{ transform, opacity, filter, boxShadow }}
                aria-hidden="true"
              >
                <img
                  src={post.thumbnailUrl || post.mediaUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          })}
        </div>

        <div className="mx-auto flex items-center justify-center gap-2 sm:block sm:w-[340px]">
          {totalSlides > 1 ? (
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-latte-100 text-coffee-900 shadow-md ring-1 ring-coffee-200 transition hover:bg-coffee-100 sm:hidden"
              onClick={goToPreviousSlide}
              aria-label="Vorige slide"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          ) : null}

          <div className="relative w-[316px] sm:w-[340px]" style={{ aspectRatio: '9 / 17.9' }}>
          <div className="absolute inset-x-7 bottom-[-12px] h-10 rounded-[999px] bg-coffee-900/35 blur-xl" aria-hidden="true" />

          <div className="pointer-events-none absolute -left-[4px] top-[21.5%] h-[52px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-[4px] top-[33.2%] h-[82px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-[4px] top-[47.2%] h-[82px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-[4px] top-[37.4%] h-[116px] w-[4px] rounded-r-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />

            <article className="relative h-full rounded-[3.15rem] bg-[linear-gradient(145deg,#f4f6fa_0%,#d4d8e2_14%,#a9afba_30%,#f8f9fb_50%,#9ca3af_70%,#dbe0e8_84%,#f4f6fa_100%)] p-[2.6px] shadow-[0_30px_65px_rgba(15,42,39,0.4)]">
            <div className="relative h-full rounded-[2.98rem] bg-[#0c0d10] p-[5px]">
              <div className="pointer-events-none absolute left-1/2 top-[6px] z-20 h-[26px] w-[118px] -translate-x-1/2 rounded-[999px] bg-black shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]" aria-hidden="true">
                <span className="absolute left-[16px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
                <span className="absolute right-[12px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
              </div>

              <div className="flex h-full flex-col overflow-hidden rounded-[2.62rem] bg-[#f8f5ef] ring-1 ring-white/10">
                <div className="flex-1">
                <div className="pointer-events-none flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-coffee-700" aria-hidden="true">
                  <span>{currentTime}</span>
                  <span>5G</span>
                </div>

                <header className="flex items-center justify-between border-b border-coffee-200 px-4 pb-2 pt-1.5">
                  <strong className="font-clean text-[11px] uppercase tracking-[0.2em] text-coffee-800">COZY Moments</strong>
                  <div className="flex items-center gap-2 text-coffee-700">
                    <Heart size={15} aria-hidden="true" />
                    <MessageCircle size={15} aria-hidden="true" />
                  </div>
                </header>

                <a
                  href={visiblePost.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="block focus-visible:outline-none"
                  aria-label="Open actieve Instagram post in nieuw tabblad"
                >
                  <div className="relative aspect-square overflow-hidden bg-coffee-200">
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: shouldAnimateSlide ? 'translateX(-100%)' : 'translateX(0)',
                        transition: shouldAnimateSlide
                          ? `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                          : 'none',
                      }}
                    >
                      <img
                        src={basePost.thumbnailUrl || basePost.mediaUrl}
                        alt={captionPreview(basePost.caption)}
                        className="h-full w-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    {enteringPost ? (
                      <div
                        className="absolute inset-0"
                        style={{
                          transform: shouldAnimateSlide ? 'translateX(0)' : 'translateX(100%)',
                          transition: shouldAnimateSlide
                            ? `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                            : 'none',
                        }}
                      >
                        <img
                          src={enteringPost.thumbnailUrl || enteringPost.mediaUrl}
                          alt={captionPreview(enteringPost.caption)}
                          className="h-full w-full object-cover"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(132deg,rgba(255,255,255,0.2)_0,rgba(255,255,255,0)_36%)]" aria-hidden="true" />
                  </div>
                </a>

                <div className="space-y-2 border-b border-coffee-200 px-4 py-3">
                  <div className="flex items-center justify-between text-coffee-800">
                    <div className="flex items-center gap-3">
                      <Heart size={18} aria-hidden="true" />
                      <MessageCircle size={18} aria-hidden="true" />
                      <ExternalLink size={17} aria-hidden="true" />
                    </div>
                    <Bookmark size={17} aria-hidden="true" />
                  </div>
                  <p className="font-clean text-[13px] leading-snug text-coffee-800">
                    <span className="font-semibold">@{username}</span> {captionPreview(visiblePost.caption)}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-coffee-500">{formatDate(visiblePost.timestamp)}</p>
                </div>
                </div>

                <footer className="mt-auto flex items-center justify-around border-t border-coffee-200 bg-[#f8f5ef] px-4 py-3 text-coffee-600">
                  <House size={16} aria-hidden="true" />
                  <Search size={16} aria-hidden="true" />
                  <Clapperboard size={16} aria-hidden="true" />
                  <UserRound size={16} aria-hidden="true" />
                </footer>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[2.98rem] bg-[linear-gradient(138deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0)_36%,rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)]" aria-hidden="true" />
            </div>
            </article>
          </div>

          {totalSlides > 1 ? (
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#111114] text-latte-100 shadow-md transition hover:bg-black sm:hidden"
              onClick={goToNextSlide}
              aria-label="Volgende slide"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          ) : null}
        </div>

      </div>

      {totalSlides > 1 ? (
        <div className="hidden items-center justify-center gap-3 sm:flex" aria-label="Carousel controls">
          <button
            type="button"
            className="grid h-12 w-12 place-items-center bg-latte-100 text-coffee-900 shadow-md ring-1 ring-coffee-200 transition hover:bg-coffee-100"
            onClick={goToPreviousSlide}
            aria-label="Vorige slide"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="grid h-12 w-12 place-items-center bg-[#111114] text-latte-100 shadow-md transition hover:bg-black"
            onClick={goToNextSlide}
            aria-label="Volgende slide"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default InstagramCarousel;
