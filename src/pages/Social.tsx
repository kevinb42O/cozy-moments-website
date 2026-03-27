import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import InstagramCarousel from '../components/InstagramCarousel';
import { instagramFeedData } from '../data/instagramPosts';
import { Facebook, Instagram } from 'lucide-react';

const Social = () => {
  const { meta, posts } = instagramFeedData;

  return (
    <div className="bg-latte-100 min-h-screen">
      <SEO
        title="Social & Sfeer | COZY Moments"
        description="Volg de social sfeer van COZY Moments. Een impressie van onze gezellige koffiebar en lounge in Blankenberge."
        canonical="https://www.cozy-moments.be/social"
      />
      <PageHero
        title="Social Media"
        subtitle="Instagram Feed"
        description="Ontdek de laatste momenten bij COZY rechtstreeks van onze Socials."
        imageSrc="https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      >
        <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
          <a
            href="https://www.facebook.com/profile.php?id=61576070607157"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(24,119,242,0.28)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#166FE0]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 backdrop-blur-sm transition group-hover:bg-white/30">
              <Facebook size={15} aria-hidden="true" />
            </span>
            Facebook
          </a>

          <a
            href={`https://www.instagram.com/${meta.username}/`}
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
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">
        <InstagramCarousel
          posts={posts}
          username={meta.username}
          autoplay
          autoplayIntervalMs={4000}
          stale={meta.stale}
          staleReason={meta.staleReason}
        />
      </div>
    </div>
  );
};

export default Social;
