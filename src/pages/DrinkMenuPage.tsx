import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Seo from '../components/SEO';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { DrinkMenuItem, DrinkMenuSection, SiteSettings } from '../types/drinkMenu';

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const toNullableString = (value: unknown): string | null => {
  return typeof value === 'string' ? value : null;
};

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === 'string');
};

const normalizeMenuItem = (value: unknown): DrinkMenuItem | null => {
  if (!isRecord(value)) {
    return null;
  }

  const openBottleProductId = value.openBottleProductId;

  if (
    typeof value.id !== 'string' ||
    typeof value.name !== 'string' ||
    typeof value.price !== 'string' ||
    typeof value.isVisible !== 'boolean'
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    price: value.price,
    isVisible: value.isVisible,
    openBottleProductId: toNullableString(openBottleProductId),
  };
};

const normalizeMenuSections = (value: unknown): DrinkMenuSection[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((section) => {
    if (!isRecord(section)) {
      return [];
    }

    if (
      typeof section.id !== 'string' ||
      typeof section.sectionCode !== 'string' ||
      typeof section.title !== 'string' ||
      typeof section.isVisible !== 'boolean'
    ) {
      return [];
    }

    if (!section.isVisible) {
      return [];
    }

    const items = Array.isArray(section.items)
      ? section.items
          .map(normalizeMenuItem)
          .filter((item): item is DrinkMenuItem => item?.isVisible === true)
      : [];

    return [
      {
        id: section.id,
        sectionCode: section.sectionCode,
        title: section.title,
        isVisible: section.isVisible,
        items,
      },
    ];
  });
};

const normalizeSiteSettings = (value: unknown): SiteSettings => {
  if (!isRecord(value)) {
    return {
      drink_menu_sections: [],
      open_bottles: null,
      promo_open_bottle_product_id: null,
      promo_drink_menu_item_ids: [],
    };
  }

  const promoOpenBottleProductId = value.promo_open_bottle_product_id;

  return {
    drink_menu_sections: normalizeMenuSections(value.drink_menu_sections),
    open_bottles: isRecord(value.open_bottles) ? value.open_bottles : null,
    promo_open_bottle_product_id: toNullableString(promoOpenBottleProductId),
    promo_drink_menu_item_ids: toStringArray(value.promo_drink_menu_item_ids),
  };
};

const DrinkMenuPage = () => {
  const { hash } = useLocation();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    drink_menu_sections: [],
    open_bottles: null,
    promo_open_bottle_product_id: null,
    promo_drink_menu_item_ids: [],
  });
  const [activeId, setActiveId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (!isMounted) {
          return;
        }

        setErrorMessage('Supabase is niet geconfigureerd. Voeg VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY toe aan je lokale env-bestand.');
        setSiteSettings({
          drink_menu_sections: [],
          open_bottles: null,
          promo_open_bottle_product_id: null,
          promo_drink_menu_item_ids: [],
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase
        .from('site_settings')
        .select('drink_menu_sections, open_bottles, promo_open_bottle_product_id, promo_drink_menu_item_ids')
        .eq('id', 'default')
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage('De drankkaart kon niet geladen worden vanuit Supabase. Controleer of de anon key leesrechten heeft op public.site_settings en of de rij met id default bestaat.');
        setSiteSettings({
          drink_menu_sections: [],
          open_bottles: null,
          promo_open_bottle_product_id: null,
          promo_drink_menu_item_ids: [],
        });
        setIsLoading(false);
        return;
      }

      const normalizedSettings = normalizeSiteSettings(data);
      setSiteSettings(normalizedSettings);
      setActiveId(normalizedSettings.drink_menu_sections[0]?.id ?? '');
      setIsLoading(false);
    };

    void loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [hash, isLoading, siteSettings.drink_menu_sections]);

  useEffect(() => {
    if (siteSettings.drink_menu_sections.length === 0) {
      return;
    }

    const ids = siteSettings.drink_menu_sections.map((section) => section.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [siteSettings.drink_menu_sections]);

  useEffect(() => {
    if (!navRef.current || !activeId) {
      return;
    }

    const button = navRef.current.querySelector(`[data-cat="${activeId}"]`);
    if (button instanceof HTMLElement) {
      button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  return (
    <div className="bg-latte-100 min-h-screen">
      <Seo
        title="Drankkaart | COZY Moments Blankenberge"
        description="Bekijk onze actuele drankkaart met zichtbare secties, prijzen en open-fles promo's uit COZY Moments Supabase."
        canonical="https://cozy-moments.be/menu"
      />
      <PageHero
        title="Drankkaart"
        subtitle="Onze Kaart"
        description="Ontdek onze actuele selectie dranken en zie meteen welke fles vandaag extra in de kijker staat."
        imageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {siteSettings.drink_menu_sections.length > 0 && (
        <div className="sticky top-20 sm:top-24 z-40 border-b border-coffee-900/5 bg-latte-100/80 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-coffee-900/8 bg-latte-100/95 shadow-[0_12px_30px_-24px_rgba(26,46,42,0.55)]">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-latte-100/95 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-latte-100/95 to-transparent" />
              <div
                ref={navRef}
                className="scrollbar-hide flex snap-x gap-2 overflow-x-auto px-3 py-3 sm:px-4"
              >
                {siteSettings.drink_menu_sections.map((section) => (
                  <button
                    key={section.id}
                    data-cat={section.id}
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                      activeId === section.id
                        ? 'bg-coffee-900 text-latte-100 shadow-[0_10px_20px_-14px_rgba(26,46,42,0.9)]'
                        : 'bg-coffee-900/3 text-coffee-700 hover:bg-coffee-900/7 hover:text-coffee-900'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading && (
          <div className="rounded-4xl border border-coffee-900/10 bg-coffee-900/3 px-6 py-10 text-center">
            <p className="text-sm font-sans uppercase tracking-[0.3em] text-coffee-500">Laden</p>
            <h2 className="mt-3 text-3xl font-serif text-coffee-900">Drankkaart wordt opgehaald</h2>
            <p className="mt-3 text-sm text-coffee-700">We laden de zichtbare secties, items en open-fles promo uit Supabase.</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="rounded-4xl border border-rose-900/10 bg-rose-50 px-6 py-10 text-center">
            <p className="text-sm font-sans uppercase tracking-[0.3em] text-rose-700">Foutmelding</p>
            <h2 className="mt-3 text-3xl font-serif text-coffee-900">Drankkaart niet beschikbaar</h2>
            <p className="mt-3 mx-auto max-w-2xl text-sm text-coffee-700">{errorMessage}</p>
          </div>
        )}

        {!isLoading && !errorMessage && siteSettings.drink_menu_sections.length === 0 && (
          <div className="rounded-4xl border border-coffee-900/10 bg-coffee-900/3 px-6 py-10 text-center">
            <p className="text-sm font-sans uppercase tracking-[0.3em] text-coffee-500">Nog leeg</p>
            <h2 className="mt-3 text-3xl font-serif text-coffee-900">Er staat nog geen drankkaart online</h2>
            <p className="mt-3 mx-auto max-w-2xl text-sm text-coffee-700">
              Voeg zichtbare secties en items toe aan drink_menu_sections in public.site_settings voor de rij met id default om deze pagina te vullen.
            </p>
          </div>
        )}

        {!isLoading && !errorMessage && siteSettings.drink_menu_sections.length > 0 && (
          <div className="space-y-28">
            {siteSettings.drink_menu_sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-36 sm:scroll-mt-40">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                  className="mb-10"
                >
                  <div className="mt-3">
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight text-coffee-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 h-px w-16 bg-gold-500" />
                </motion.div>

                {section.items.length > 0 ? (
                  <div className="grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
                    {section.items.map((item, itemIndex) => {
                      const isOpenBottlePromoActive =
                        Boolean(item.openBottleProductId) &&
                        item.openBottleProductId === siteSettings.promo_open_bottle_product_id &&
                        Boolean(siteSettings.open_bottles?.[item.openBottleProductId]);

                      const isDirectPromoItem = siteSettings.promo_drink_menu_item_ids.includes(item.id);

                      const isPromoActive = isOpenBottlePromoActive || isDirectPromoItem;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: Math.min(itemIndex * 0.03, 0.3), ease }}
                          className={`group flex items-baseline justify-between rounded-2xl border px-4 py-4 transition-colors duration-200 ${
                            isPromoActive
                              ? 'border-gold-500/35 bg-gold-500/10 shadow-[0_16px_30px_-24px_rgba(184,151,90,0.95)]'
                              : 'border-transparent border-b-coffee-900/5'
                          }`}
                        >
                          <div className="min-w-0 flex-1 pr-4">
                            <span className={`block text-base font-sans font-medium transition-colors duration-200 ${
                              isPromoActive
                                ? 'text-coffee-900'
                                : 'text-coffee-900 group-hover:text-gold-600'
                            }`}>
                              {item.name}
                            </span>
                            {isPromoActive && (
                              <span className="mt-2 inline-flex rounded-full border border-gold-600/35 bg-gold-500/15 px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-700">
                                Extra stempel op klantenkaart
                              </span>
                            )}
                          </div>
                          <span className={`shrink-0 tabular-nums text-sm font-semibold ${
                            isPromoActive ? 'text-gold-700' : 'text-coffee-800'
                          }`}>
                            {item.price}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-coffee-600">Deze sectie bevat nog geen zichtbare items.</p>
                )}
              </section>
            ))}
          </div>
        )}
      </div>

      <div className="bg-coffee-900 text-latte-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            Kleine extra&apos;s maken{' '}
            <span className="italic text-gold-500">het moment</span>
          </p>
          <p className="mt-4 mx-auto max-w-md text-sm font-sans text-latte-200/60">
            Open-fles promoties zijn hier enkel visuele communicatie. De website kent geen automatische extra stempels toe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrinkMenuPage;