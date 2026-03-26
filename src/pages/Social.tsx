import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import InstagramCarousel from '../components/InstagramCarousel';
import { instagramFeedData } from '../data/instagramPosts';

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
        title="Social"
        subtitle="Instagram Feed"
        description="Ontdek de laatste momenten bij COZY rechtstreeks van onze Instagram."
        imageSrc="https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

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
