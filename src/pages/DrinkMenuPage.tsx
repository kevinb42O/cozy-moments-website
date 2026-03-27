import { motion } from 'motion/react';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Seo from '../components/SEO';
import { PROMO_ROTATION_INTERVAL_MS } from '../constants';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { ActivePromo, DrinkMenuItem, DrinkMenuSection, SiteSettings } from '../types/drinkMenu';

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

const normalizeComparableText = (value: string): string => {
  return value
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
};

const categoryAliases: Record<string, string[]> = {
  wine: ['wine', 'wijn', 'wijnen', 'bubbels', 'bubbles', 'prosecco', 'cava', 'champagne'],
  beer: ['beer', 'bier', 'bieren', 'speciaalbier', 'speciaalbieren'],
  cocktail: ['cocktail', 'cocktails'],
  '0-0-dranken': ['0-0-dranken', '0.0-dranken', 'alcoholvrij', 'zero-zero', 'mocktail', 'mocktails', 'virgin'],
  'alcoholische-sterke-dranken': ['alcoholische-sterke-dranken', 'sterke-dranken', 'sterkedrank', 'sterke', 'spirit', 'spirits', 'gin', 'rum', 'vodka', 'whisky'],
  'verfrissende-dranken': ['verfrissende-dranken', 'verfrissend', 'fris', 'frisdrank', 'frisdranken', 'limonade', 'ice-tea', 'ijsthee'],
};

const preferredCategoryTargets: Record<string, string[]> = {
  cocktail: ['cocktails', 'cocktail'],
  cocktails: ['cocktails', 'cocktail'],
  'alcoholische-sterke-dranken': ['alcoholische-sterke-dranken', 'sterke-dranken'],
};

const buildMenuItems = (items: Array<[string, string]>): DrinkMenuItem[] => {
  return items.map(([name, price]) => ({
    id: normalizeComparableText(`${name}-${price}`),
    name,
    price: /\d/.test(price) ? `€ ${price}` : price,
    isVisible: true,
    openBottleProductId: null,
  }));
};

const curatedSectionDefinitions: DrinkMenuSection[] = [
  {
    id: 'alcoholische-sterke-dranken',
    sectionCode: 'ALCOHOLISCHE_STERKE_DRANKEN',
    title: 'Alcoholische Sterke Dranken',
    isVisible: true,
    items: buildMenuItems([
      ['Martini Bianco', '5,50'],
      ['Martini Rosso', '5,50'],
      ['Kir', '6,50'],
      ['Kir Royal', '7,50'],
      ['Picon Vin Blanc', '9,00'],
      ['Rode Porto Martinez', '5,50'],
      ['Rode Porto Smith Woodhouse', '11,00'],
      ['Rode Sherry Colosia Oloroso', '5,50'],
      ['Witte Porto Martinez', '5,50'],
      ['Ricard Pastis', '6,50'],
      ['Pineau des Charentes', '5,50'],
      ['Campari', '6,50'],
      ['Amaretto Disaronno', '6,80'],
      ['Baileys', '6,80'],
      ['Cointreau', '7,00'],
      ['Grand Marnier', '7,00'],
      ['Licor 43', '6,80'],
      ['Passoa', '6,50'],
      ['Pisang', '6,50'],
      ['Safari', '6,50'],
      ['Limoncello', '7,00'],
      ['Malibu', '6,50'],
      ['Bulldog', '7,50'],
      ["Hendrick's", '8,50'],
      ['Copperhead', '9,50'],
      ['Gin Mare', '9,50'],
      ['Gin Mare Capri', '12,00'],
      ['Tanqueray', '7,50'],
      ['Fever Tree (supplement)', '3,50'],
      ['Martell', '8,00'],
      ['Bisquit & Dubouche', '8,00'],
      ['Eristoff', '6,50'],
      ['Eristoff Red', '6,50'],
      ['Eristoff Passion', '6,50'],
      ['AU Vodka Blue Raspberry', '8,00'],
      ['AU Vodka Pink Lemonade', '8,00'],
      ['Grey Goose', '9,50'],
      ['AANRADER: AU Vodka + Sprite', 'vraag naar prijs'],
      ['Johnnie Walker Red', '6,50'],
      ['Johnnie Walker Black', '7,00'],
      ['Johnnie Walker Ruby', '7,50'],
      ['Johnnie Walker Blue baby', '15,00'],
      ['Johnnie Walker Blue', '22,00'],
      ['J&B', '6,50'],
      ['Glenfiddich 12', '10,00'],
      ['Chivas Regal', '7,20'],
      ['Oban', '15,00'],
      ['Bacardi Carta Blanca', '6,50'],
      ['Bacardi Carta Negra', '6,50'],
      ['Bacardi Carta Oro', '6,50'],
      ['Bacardi Anejo Cuatro', '7,00'],
      ['Bacardi Reserva Ocho', '8,50'],
      ['Havana Club Anejo 7 Anos', '9,50'],
      ['Rhum J.M. Jardin Fruite', '10,00'],
      ['Rhum J.M. Fumee Volcanique', '10,00'],
      ['The Kraken Black Spiced Rum', '7,00'],
      ['Sister Isles Rum', '12,50'],
      ['Saint James Royal Ambre', '6,50'],
      ['Captain Morgan Dark Rum', '6,50'],
      ['Red Rope Cocoa Rum', '9,00'],
      ['Dictador Colombiana', '9,50'],
      ['Diplomatico Reserva Exclusiva', '10,00'],
      ['Appleton Estate Signature Rum', '7,00'],
    ]),
  },
  {
    id: 'cocktails',
    sectionCode: 'COCKTAILS',
    title: 'Cocktails',
    isVisible: true,
    items: buildMenuItems([
      ['Mojito', '10,50'],
      ['Pornstar Martini', '10,50'],
      ['Negroni', '10,50'],
      ['Lazy Red Cheeks', '10,50'],
      ['Aperol Spritz', '11,50'],
      ['Limoncello Spritz', '11,50'],
      ['Sex On The Beach', '11,50'],
    ]),
  },
];

type SectionGroupDefinition = {
  title: string;
  itemNames: string[];
};

type ResolvedSectionGroup = {
  title: string;
  items: DrinkMenuItem[];
};

const sectionGroupDefinitions: Record<string, SectionGroupDefinition[]> = {
  'koffie-choco-melk': [
    {
      title: 'Koffie klassiekers',
      itemNames: [
        'Koffie*',
        'Deca*',
        'Espresso',
        'Dubbele Espresso',
        'Americano',
        'Cappuccino Melkschuim*',
        'Cappuccino Slagroom',
        'Latte Macchiato*',
        'Koffie Verkeerd*',
      ],
    },
    {
      title: 'Iced coffee & smaken',
      itemNames: [
        'Iced Coffee',
        '+ Hazelnootsiroop',
        '+ Caramelsiroop',
        '+ Speculoossiroop',
        '+ Vanillesiroop',
        '+ Witte Chocoladesiroop',
        '+ Creme Brulee siroop',
        '+ Chocolate Cookie siroop',
        '+ Amaretto Siroop (0% alcohol)',
      ],
    },
    {
      title: 'Coffee specials',
      itemNames: [
        'Italian Coffee (Amaretto)',
        'French Coffee (Cointreau)',
        'Spanish Coffee (Licor 43)',
        'Irish Coffee (Irish Whiskey)',
        'Espresso Martini',
      ],
    },
    {
      title: 'Warme chocolade',
      itemNames: [
        'Warme Hotcemel',
        'Warme Cecemel',
        'Warme Chocolademelk Baru',
        'Warme Melk + Callebaut Chocolade*',
        '+ Slagroom',
        '+ Mini Marshmallows',
      ],
    },
    {
      title: 'Melkdranken',
      itemNames: ['Cecemel (koud)', 'Fristi', 'Melk*'],
    },
  ],
  'thee-chai-matcha': [
    {
      title: 'Losse thee',
      itemNames: [
        'Earl Grey',
        'Sencha Lemon',
        'Fruity Forest',
        'Ruby Rooibos',
        'Champaign All Day',
        'Sea of Blossoms',
        'Subtiele Munt Thee',
        'Kamille Linde Thee',
        'Rozenbottel Thee',
      ],
    },
    {
      title: 'Chai specials',
      itemNames: [
        'Vanille Chai Latte Baru',
        'Spiced Chai Latte Baru',
        'Pumpkin Spiced Latte Baru',
        'Pink Chai Latte Baru',
      ],
    },
    {
      title: 'Matcha bar',
      itemNames: [
        'Matcha Latte Baru',
        'Premium Matcha Latte*',
        'Ceremonial Matcha Latte*',
        'Iced Premium Matcha Latte*',
        'Iced Ceremonial Matcha Latte*',
      ],
    },
    {
      title: 'Fruit add-ons',
      itemNames: ['+ Raspberry', '+ Strawberry', '+ Mango'],
    },
  ],
  'alcoholische-sterke-dranken': [
    {
      title: 'Aperitief & bitter',
      itemNames: [
        'Martini Bianco',
        'Martini Rosso',
        'Kir',
        'Kir Royal',
        'Picon Vin Blanc',
        'Rode Porto Martinez',
        'Rode Porto Smith Woodhouse',
        'Rode Sherry Colosia Oloroso',
        'Witte Porto Martinez',
        'Ricard Pastis',
        'Pineau des Charentes',
        'Campari',
      ],
    },
    {
      title: 'Likeuren',
      itemNames: [
        'Amaretto Disaronno',
        'Baileys',
        'Cointreau',
        'Grand Marnier',
        'Licor 43',
        'Passoa',
        'Pisang',
        'Safari',
        'Limoncello',
        'Malibu',
      ],
    },
    {
      title: 'Gin',
      itemNames: ['Bulldog', "Hendrick's", 'Copperhead', 'Gin Mare', 'Gin Mare Capri', 'Tanqueray', 'Fever Tree (supplement)', '+ Fever Tree'],
    },
    {
      title: 'Cognac',
      itemNames: ['Martell', 'Bisquit & Dubouche', 'Bisquit & Dubouché'],
    },
    {
      title: 'Vodka',
      itemNames: [
        'Eristoff',
        'Eristoff Red',
        'Eristoff Passion',
        'AU Vodka Blue Raspberry',
        'AU Vodka Pink Lemonade',
        'Grey Goose',
      ],
    },
    {
      title: 'Whisky',
      itemNames: [
        'Johnnie Walker Red',
        'Johnnie Walker Black',
        'Johnnie Walker Ruby',
        'Johnnie Walker Blue baby',
        'Johnnie Walker Blue',
        'J&B',
        'Glenfiddich 12',
        'Chivas Regal',
        'Oban',
      ],
    },
    {
      title: 'Rum',
      itemNames: [
        'Bacardi Carta Blanca',
        'Bacardi Carta Negra',
        'Bacardi Carta Oro',
        'Bacardi Anejo Cuatro',
        'Bacardi Añejo Cuatro',
        'Bacardi Reserva Ocho',
        'Havana Club Anejo 7 Anos',
        'Havana Club Añejo 7 Años',
        'Rhum J.M. Jardin Fruite',
        'Rhum J.M. Jardin Fruité',
        'Rhum J.M. Fumee Volcanique',
        'Rhum J.M. Fumée Volcanique',
        'The Kraken Black Spiced Rum',
        'Sister Isles Rum',
        'Saint James Royal Ambre',
        'Saint James Royal Ambré',
        'Captain Morgan Dark Rum',
        'Red Rope Cocoa Rum',
        'Dictador Colombiana',
        'Diplomatico Reserva Exclusiva',
        'Appleton Estate Signature Rum',
      ],
    },
  ],
  cocktails: [
    {
      title: 'Klassiekers',
      itemNames: ['Mojito', 'Pornstar Martini', 'Negroni', 'Lazy Red Cheeks'],
    },
    {
      title: 'Spritz & fruity',
      itemNames: ['Aperol Spritz', 'Limoncello Spritz', 'Sex On The Beach'],
    },
  ],
};

const sectionGroupAliases: Record<string, string[]> = {
  'koffie-choco-melk': ['koffie-choco-melk', 'koffie-choco-en-melk', 'koffie-melk', 'koffie-choco'],
  'thee-chai-matcha': ['thee-chai-matcha', 'thee-chai-en-matcha', 'thee-matcha', 'chai-matcha'],
  'alcoholische-sterke-dranken': [
    'alcoholische-sterke-dranken',
    'sterke-dranken',
    'sterkedrank',
    'sterke',
    'spirits',
    'alcoholische-sterke-dranken',
  ],
  cocktails: ['cocktails', 'cocktail'],
};

const resolveSectionGroupKey = (section: DrinkMenuSection): string | null => {
  const comparableFields = [section.id, section.title, section.sectionCode].map(normalizeComparableText);

  for (const key of Object.keys(sectionGroupDefinitions)) {
    const normalizedKey = normalizeComparableText(key);
    if (comparableFields.includes(normalizedKey)) {
      return key;
    }

    const aliases = sectionGroupAliases[key] ?? [key];
    const normalizedAliases = aliases.map(normalizeComparableText);

    if (comparableFields.some((field) => normalizedAliases.includes(field))) {
      return key;
    }

    const tokens = normalizedAliases
      .flatMap((alias) => alias.split('-'))
      .filter((token) => token.length >= 3);

    const haystack = comparableFields.join(' ');
    const tokenScore = tokens.reduce((score, token) => (haystack.includes(token) ? score + 1 : score), 0);

    if (tokenScore >= 2) {
      return key;
    }
  }

  return null;
};

const resolveSectionGroups = (section: DrinkMenuSection): ResolvedSectionGroup[] => {
  const groupKey = resolveSectionGroupKey(section);
  const definitions = groupKey ? sectionGroupDefinitions[groupKey] ?? [] : [];

  if (definitions.length === 0) {
    return [{ title: '', items: section.items }];
  }

  const itemByName = new Map(section.items.map((item) => [normalizeComparableText(item.name), item]));
  const usedItemIds = new Set<string>();

  const groups = definitions
    .map((definition) => {
      const items = definition.itemNames
        .map((itemName) => itemByName.get(normalizeComparableText(itemName)))
        .filter((item): item is DrinkMenuItem => Boolean(item));

      items.forEach((item) => usedItemIds.add(item.id));

      return {
        title: definition.title,
        items,
      };
    })
    .filter((group) => group.items.length > 0);

  const remainingItems = section.items.filter((item) => !usedItemIds.has(item.id));
  if (remainingItems.length > 0) {
    groups.push({ title: 'Overige', items: remainingItems });
  }

  return groups.length > 0 ? groups : [{ title: '', items: section.items }];
};

const getComparableFields = (section: DrinkMenuSection): string[] => {
  return [section.id, section.title, section.sectionCode].map(normalizeComparableText);
};

const mergeCuratedSections = (sections: DrinkMenuSection[]): DrinkMenuSection[] => {
  const merged = [...sections];

  curatedSectionDefinitions.forEach((curatedSection) => {
    const curatedComparableFields = getComparableFields(curatedSection);
    const existingIndex = merged.findIndex((existingSection) => {
      const existingComparableFields = getComparableFields(existingSection);
      return existingComparableFields.some((field) => curatedComparableFields.includes(field));
    });

    // Keep sections from Supabase authoritative; only add curated fallback when missing.
    if (existingIndex >= 0) {
      return;
    }

    merged.push(curatedSection);
  });

  return merged;
};

const resolveSectionIdFromCategory = (sections: DrinkMenuSection[], category: string): string | null => {
  const normalizedCategory = normalizeComparableText(category);

  const preferredTargets = preferredCategoryTargets[normalizedCategory] ?? null;
  if (preferredTargets) {
    const normalizedPreferredTargets = preferredTargets.map(normalizeComparableText);
    const directMatch = sections.find((section) => {
      const comparable = getComparableFields(section);
      return comparable.some((value) => normalizedPreferredTargets.includes(value));
    });

    if (directMatch) {
      return directMatch.id;
    }
  }

  const aliasTokens = categoryAliases[normalizedCategory] ?? [normalizedCategory];
  const tokens = aliasTokens
    .flatMap((token) => token.split('-'))
    .filter((token) => token.length >= 3);

  let bestMatch: { id: string; score: number } | null = null;

  for (const section of sections) {
    const normalizedId = normalizeComparableText(section.id);
    const normalizedTitle = normalizeComparableText(section.title);
    const normalizedCode = normalizeComparableText(section.sectionCode);
    const haystack = [normalizedId, normalizedTitle, normalizedCode].join(' ');

    if ([normalizedId, normalizedTitle, normalizedCode].includes(normalizedCategory)) {
      return section.id;
    }

    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) {
        score += 1;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { id: section.id, score };
    }
  }

  return bestMatch?.id ?? null;
};

const resolvePromoItemIds = (siteSettings: SiteSettings): string[] => {
  const directPromoIds = new Set(siteSettings.promo_drink_menu_item_ids);

  const allItems = siteSettings.drink_menu_sections.flatMap((section) => section.items);

  const openBottleMatches = allItems
    .filter(
      (item) =>
        Boolean(item.openBottleProductId) &&
        item.openBottleProductId === siteSettings.promo_open_bottle_product_id &&
        Boolean(siteSettings.open_bottles?.[item.openBottleProductId])
    )
    .map((item) => item.id);

  openBottleMatches.forEach((id) => directPromoIds.add(id));

  if (directPromoIds.size > 0 || !siteSettings.promo_open_bottle_product_id) {
    return [...directPromoIds];
  }

  const normalizedPromoProductId = normalizeComparableText(siteSettings.promo_open_bottle_product_id);

  const fuzzyMatches = allItems.filter((item) => {
    const normalizedItemId = normalizeComparableText(item.id);
    const normalizedItemName = normalizeComparableText(item.name);

    return (
      normalizedItemId.includes(normalizedPromoProductId) ||
      normalizedItemName.includes(normalizedPromoProductId) ||
      normalizedPromoProductId.includes(normalizedItemId)
    );
  });

  const glassMatches = fuzzyMatches.filter((item) => {
    const normalizedItemId = normalizeComparableText(item.id);
    const normalizedItemName = normalizeComparableText(item.name);

    return normalizedItemId.includes('glas') || normalizedItemName.includes('glas');
  });

  const resolvedMatches = glassMatches.length > 0 ? glassMatches : fuzzyMatches;

  resolvedMatches.forEach((item) => directPromoIds.add(item.id));

  return [...directPromoIds];
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

const normalizeActivePromos = (value: unknown): ActivePromo[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!isRecord(entry)) {
      return [];
    }

    if (typeof entry.productId !== 'string' || typeof entry.promoMessage !== 'string') {
      return [];
    }

    return [
      {
        productId: entry.productId,
        promoMessage: entry.promoMessage,
        drinkMenuItemIds: toStringArray(entry.drinkMenuItemIds),
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
      active_promos: [],
    };
  }

  const promoOpenBottleProductId = value.promo_open_bottle_product_id;

  const activePromos = normalizeActivePromos(value.active_promos);

  // Backward compat: if active_promos is empty, build a single-element array
  // from the old columns (if they contain data).
  const promoMessage = typeof value.promo_message === 'string' ? value.promo_message : null;
  const legacyPromoItemIds = toStringArray(value.promo_drink_menu_item_ids);
  const legacyProductId = toNullableString(promoOpenBottleProductId);

  const resolvedPromos =
    activePromos.length > 0
      ? activePromos
      : promoMessage && legacyProductId
        ? [
            {
              productId: legacyProductId,
              promoMessage,
              drinkMenuItemIds: legacyPromoItemIds,
            },
          ]
        : [];

  return {
    drink_menu_sections: normalizeMenuSections(value.drink_menu_sections),
    open_bottles: isRecord(value.open_bottles) ? value.open_bottles : null,
    promo_open_bottle_product_id: toNullableString(promoOpenBottleProductId),
    promo_drink_menu_item_ids: toStringArray(value.promo_drink_menu_item_ids),
    active_promos: resolvedPromos,
  };
};

const DrinkMenuPage = () => {
  const { hash, search } = useLocation();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    drink_menu_sections: [],
    open_bottles: null,
    promo_open_bottle_product_id: null,
    promo_drink_menu_item_ids: [],
    active_promos: [],
  });
  const [activeId, setActiveId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Promo banner rotation state
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const [promoVisible, setPromoVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const rotationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearRotationTimer = useCallback(() => {
    if (rotationTimerRef.current !== null) {
      clearInterval(rotationTimerRef.current);
      rotationTimerRef.current = null;
    }
  }, []);

  // Reset rotation when promos change
  useEffect(() => {
    setActivePromoIndex(0);
    setPromoVisible(true);
  }, [siteSettings.active_promos]);

  // Rotation interval
  useEffect(() => {
    const promoCount = siteSettings.active_promos.length;
    if (promoCount <= 1 || isPaused) {
      clearRotationTimer();
      return;
    }

    rotationTimerRef.current = setInterval(() => {
      // Fade out
      setPromoVisible(false);
      // After fade-out completes, advance and fade in
      setTimeout(() => {
        setActivePromoIndex((prev) => (prev + 1) % promoCount);
        setPromoVisible(true);
      }, 400);
    }, PROMO_ROTATION_INTERVAL_MS);

    return clearRotationTimer;
  }, [siteSettings.active_promos.length, isPaused, clearRotationTimer]);

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
          active_promos: [],
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase
        .from('site_settings')
        .select('drink_menu_sections, open_bottles, promo_open_bottle_product_id, promo_drink_menu_item_ids, promo_message, active_promos')
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
          active_promos: [],
        });
        setIsLoading(false);
        return;
      }

      const normalizedSettings = normalizeSiteSettings(data);
      const hydratedSettings: SiteSettings = {
        ...normalizedSettings,
        drink_menu_sections: mergeCuratedSections(normalizedSettings.drink_menu_sections),
      };
      setSiteSettings(hydratedSettings);
      setActiveId(hydratedSettings.drink_menu_sections[0]?.id ?? '');
      setIsLoading(false);
    };

    void loadMenu();

    // Realtime subscription
    const channel =
      isSupabaseConfigured && supabase
        ? supabase
            .channel('site_settings_changes')
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'site_settings', filter: 'id=eq.default' },
              (payload) => {
                if (!isMounted) return;
                const normalizedSettings = normalizeSiteSettings(payload.new);
                const hydratedSettings: SiteSettings = {
                  ...normalizedSettings,
                  drink_menu_sections: mergeCuratedSections(normalizedSettings.drink_menu_sections),
                };
                setSiteSettings(hydratedSettings);
              }
            )
            .subscribe()
        : null;

    return () => {
      isMounted = false;
      if (channel) {
        supabase?.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const searchParams = new URLSearchParams(search);
    const category = searchParams.get('category');
    const hashTarget = hash.replace('#', '');

    const targetId = hashTarget
      ? (resolveSectionIdFromCategory(siteSettings.drink_menu_sections, hashTarget) ?? hashTarget)
      : category
        ? resolveSectionIdFromCategory(siteSettings.drink_menu_sections, category)
        : null;

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setActiveId(targetId);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [hash, isLoading, search, siteSettings.drink_menu_sections]);

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

  const promoItemIds = resolvePromoItemIds(siteSettings);
  // Merge in drinkMenuItemIds from all active_promos
  const allPromoItemIds = new Set(promoItemIds);
  for (const promo of siteSettings.active_promos) {
    for (const id of promo.drinkMenuItemIds) {
      allPromoItemIds.add(id);
    }
  }
  const promoItemIdSet = allPromoItemIds;

  const currentPromo = siteSettings.active_promos[activePromoIndex] ?? null;

  // Build a set of product names from all promo drink menu item IDs for underlining
  const allPromoItemNames = useMemo(() => {
    const names: string[] = [];
    const allItems = siteSettings.drink_menu_sections.flatMap((s) => s.items);
    for (const promo of siteSettings.active_promos) {
      for (const id of promo.drinkMenuItemIds) {
        const item = allItems.find((i) => i.id === id);
        if (item) names.push(item.name);
      }
    }
    return names;
  }, [siteSettings.active_promos, siteSettings.drink_menu_sections]);

  // Render promo message with product names underlined
  const renderPromoMessage = (message: string): ReactNode => {
    if (allPromoItemNames.length === 0) return message;

    // Escape special regex chars in item names, sort longest-first for greedy matching
    const escaped = [...allPromoItemNames]
      .sort((a, b) => b.length - a.length)
      .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
    const parts = message.split(pattern);

    return parts.map((part, i) => {
      const isMatch = allPromoItemNames.some((n) => n.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span key={i} className="underline decoration-gold-500/50 underline-offset-4 decoration-2">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="drink-menu-page bg-latte-100 min-h-screen">
      <Seo
        title="Drankkaart Blankenberge | Koffie, Cocktails & Mocktails | COZY Moments"
        description="Bekijk de drankkaart van COZY Moments in Blankenberge met koffie, cocktails, mocktails, wijn en bieren. Altijd actueel en duidelijk per categorie."
        canonical="https://www.cozy-moments.be/menu"
      />
      <PageHero
        title="Drankkaart"
        subtitle="Onze Kaart"
        description="Elke drankje , een verhaal."
        imageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {!isLoading && !errorMessage && siteSettings.active_promos.length > 0 && currentPromo && (
        <div
          className="border-b border-gold-500/20 bg-gold-500/10"
          role="region"
          aria-label="Promoties"
          aria-live="polite"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div
              className="promo-banner-content"
              style={{ opacity: promoVisible ? 1 : 0 }}
            >
              <p className="text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold-700">
                Promo in de kijker
              </p>
              <p className="mt-1 text-lg font-serif text-coffee-900">
                {renderPromoMessage(currentPromo.promoMessage)}
              </p>
            </div>
            <span className="inline-flex rounded-full border border-gold-600/35 bg-gold-500/15 px-4 py-2 text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-700">
              Extra stempel op klantenkaart
            </span>
          </div>
        </div>
      )}

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
                  <div className="space-y-10">
                    {resolveSectionGroups(section).map((group, groupIndex) => (
                      <div key={`${section.id}-${group.title || 'group'}-${groupIndex}`}>
                        {group.title && (
                          <h3 className="mb-4 text-xs font-sans font-semibold uppercase tracking-[0.24em] text-coffee-500">
                            {group.title}
                          </h3>
                        )}
                        <div className="grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
                          {group.items.map((item, itemIndex) => {
                            const isPromoActive = promoItemIdSet.has(item.id);

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
                      </div>
                    ))}
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
        </div>
      </div>
    </div>
  );
};

export default DrinkMenuPage;