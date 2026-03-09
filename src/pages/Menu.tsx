import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

const menuCategories: {
  id: string;
  title: string;
  items: { name: string; price: string; desc?: string; isExtra?: boolean }[];
  note?: string;
}[] = [
  {
    id: "koffie-choco-melk",
    title: "Koffie, Choco & Melk",
    items: [
      { name: "Koffie*", price: "€ 3,10" },
      { name: "Deca*", price: "€ 3,30" },
      { name: "Espresso", price: "€ 2,90" },
      { name: "Dubbele Espresso", price: "€ 3,90" },
      { name: "Americano", price: "€ 3,20" },
      { name: "Cappuccino Melkschuim*", price: "€ 3,50" },
      { name: "Cappuccino Slagroom", price: "€ 3,90" },
      { name: "Latte Macchiato*", price: "€ 4,10" },
      { name: "Koffie Verkeerd*", price: "€ 4,10" },
      { name: "Iced Coffee", price: "€ 6,00" },
      { name: "+ Slagroom", price: "€ 0,80", isExtra: true },
      { name: "+ Hazelnootsiroop", price: "€ 0,60", isExtra: true },
      { name: "+ Caramelsiroop", price: "€ 0,60", isExtra: true },
      { name: "+ Speculoossiroop", price: "€ 0,60", isExtra: true },
      { name: "+ Vanillesiroop", price: "€ 0,60", isExtra: true },
      { name: "+ Witte Chocoladesiroop", price: "€ 0,60", isExtra: true },
      { name: "+ Crème Brûlée siroop", price: "€ 0,60", isExtra: true },
      { name: "+ Chocolate Cookie siroop", price: "€ 0,60", isExtra: true },
      { name: "+ Amaretto Siroop (0% alcohol)", price: "€ 0,60", isExtra: true },
      { name: "Italian Coffee (Amaretto)", price: "€ 9,50" },
      { name: "French Coffee (Cointreau)", price: "€ 9,50" },
      { name: "Spanish Coffee (Licor 43)", price: "€ 9,50" },
      { name: "Irish Coffee (Irish Whiskey)", price: "€ 9,50" },
      { name: "Espresso Martini", price: "€ 9,50" },
      { name: "Warme Hotcemel", price: "€ 3,50" },
      { name: "Warme Cécémel", price: "€ 4,00" },
      { name: "Warme Chocolademelk Barú", price: "€ 5,00" },
      { name: "Warme Melk + Callebaut Chocolade*", price: "€ 6,90" },
      { name: "+ Slagroom", price: "€ 0,80", isExtra: true },
      { name: "+ Mini Marshmallows", price: "€ 1,00", isExtra: true },
      { name: "+ Amaretto", price: "€ 5,00", isExtra: true },
      { name: "+ Baileys", price: "€ 5,00", isExtra: true },
      { name: "+ Donkere Rum", price: "€ 5,00", isExtra: true },
      { name: "+ Cointreau", price: "€ 5,00", isExtra: true },
      { name: "+ Grand Marnier", price: "€ 5,00", isExtra: true },
      { name: "+ Bourbon", price: "€ 5,00", isExtra: true },
      { name: "Cécémel (koud)", price: "€ 3,00" },
      { name: "Fristi", price: "€ 3,00" },
      { name: "Melk*", price: "€ 2,80" },
    ],
    note: "*ook verkrijgbaar met lactosevrije melk"
  },
  {
    id: "thee-chai-matcha",
    title: "Thee, Chai & Matcha",
    items: [
      { name: "Earl Grey", price: "€ 3,60" },
      { name: "Sencha Lemon", price: "€ 3,60" },
      { name: "Fruity Forest", price: "€ 3,60" },
      { name: "Ruby Rooibos", price: "€ 3,60" },
      { name: "Champaign All Day", price: "€ 3,60" },
      { name: "Sea of Blossoms", price: "€ 3,60" },
      { name: "Subtiele Munt Thee", price: "€ 3,60" },
      { name: "Kamille Linde Thee", price: "€ 3,60" },
      { name: "Rozenbottel Thee", price: "€ 3,60" },
      { name: "Vanille Chai Latte Barú", price: "€ 5,00" },
      { name: "Spiced Chai Latte Barú", price: "€ 5,00" },
      { name: "Pumpkin Spiced Latte Barú", price: "€ 5,00" },
      { name: "Pink Chai Latte Barú", price: "€ 5,00" },
      { name: "Matcha Latte Barú", price: "€ 5,00" },
      { name: "Premium Matcha Latte*", price: "€ 6,00" },
      { name: "Ceremonial Matcha Latte*", price: "€ 7,50" },
      { name: "Iced Premium Matcha Latte*", price: "€ 6,50" },
      { name: "Iced Ceremonial Matcha Latte*", price: "€ 8,00" },
      { name: "+ Raspberry", price: "€ 0,60", isExtra: true },
      { name: "+ Strawberry", price: "€ 0,60", isExtra: true },
      { name: "+ Mango", price: "€ 0,60", isExtra: true },
    ]
  },
  {
    id: "smoothie",
    title: "Smoothie",
    items: [
      { name: "Berry Cherry", desc: "kers, banaan, aardbei, zwarte bes", price: "€ 6,50" },
      { name: "Pineapple Sunset", desc: "ananas, papaya, mango", price: "€ 6,50" },
      { name: "Strawberry Fantasy", desc: "aardbei, banaan", price: "€ 6,50" },
      { name: "Coconut Crush", desc: "ananas, kokosmelk", price: "€ 6,50" },
    ]
  },
  {
    id: "waters-fruitsappen",
    title: "Waters & Fruitsappen",
    items: [
      { name: "Chaudfontaine Plat 250 ml", price: "€ 3,00" },
      { name: "Chaudfontaine Bruis 250 ml", price: "€ 3,00" },
      { name: "Perrier", price: "€ 3,50" },
      { name: "+ Muntsiroop", price: "€ 0,60", isExtra: true },
      { name: "+ Grenadine", price: "€ 0,60", isExtra: true },
      { name: "+ Cassis", price: "€ 0,60", isExtra: true },
      { name: "Minute Maid Sinaasappel", price: "€ 3,10" },
      { name: "Minute Maid Appel", price: "€ 3,10" },
      { name: "Minute Maid Appel-Kers", price: "€ 3,10" },
      { name: "Minute Maid Tomaat", price: "€ 3,10" },
    ]
  },
  {
    id: "verfrissende-dranken",
    title: "Verfrissende Dranken",
    items: [
      { name: "Coca Cola", price: "€ 3,00" },
      { name: "Coca Cola Zero", price: "€ 3,00" },
      { name: "Fanta", price: "€ 3,00" },
      { name: "Sprite", price: "€ 3,00" },
      { name: "Gini", price: "€ 3,00" },
      { name: "Redbull", price: "€ 4,00" },
      { name: "Lipton Ice Tea Original", price: "€ 3,00" },
      { name: "Lipton Ice Tea Green", price: "€ 3,00" },
      { name: "Lipton Ice Tea Peach", price: "€ 3,00" },
      { name: "Fuze Tea Mango Chamomile", price: "€ 3,00" },
      { name: "Fuze Tea Sparkling Lemon", price: "€ 3,00" },
      { name: "Fuze Tea Peach Hibiscus", price: "€ 3,00" },
      { name: "Tönissteiner Orange", price: "€ 3,20" },
      { name: "Tönissteiner Citroen", price: "€ 3,20" },
      { name: "Tönissteiner Vruchtenkorf", price: "€ 3,20" },
      { name: "Tönissteiner Naranja", price: "€ 3,20" },
      { name: "Tönissteiner Exotic Fit", price: "€ 3,20" },
      { name: "Tönissteiner Agrumes Fit", price: "€ 3,20" },
      { name: "Tönissteiner Lemon-Ginger Fit", price: "€ 3,20" },
      { name: "Schweppes Tonic", price: "€ 3,00" },
      { name: "Schweppes Tonic Zero", price: "€ 3,00" },
      { name: "Schweppes Soda Water", price: "€ 3,00" },
      { name: "Schweppes Agrum", price: "€ 3,00" },
      { name: "Royal Bliss Agrumes & Ylang Ylang", price: "€ 3,20" },
      { name: "Royal Bliss Bitter Lemon", price: "€ 3,20" },
      { name: "Royal Bliss Pink Aromatic Berry", price: "€ 3,20" },
      { name: "Fever Tree Premium", price: "€ 4,00" },
      { name: "Fever Tree Mediterranean", price: "€ 4,00" },
      { name: "Fever Tree Elderflower", price: "€ 4,00" },
      { name: "Fever Tree Ginger Beer", price: "€ 4,00" },
      { name: "Fever Tree Ginger Ale", price: "€ 4,00" },
    ]
  },
  {
    id: "bieren",
    title: "Bieren",
    items: [
      { name: "Stella 25 cl | 5,2%", price: "€ 2,80" },
      { name: "Stella 33 cl | 5,2%", price: "€ 3,30" },
      { name: "Stella 50 cl | 5,2%", price: "€ 5,40" },
      { name: "Jupiler 25 cl | 5,2%", price: "€ 2,80" },
      { name: "Jupiler 33 cl | 5,2%", price: "€ 3,30" },
      { name: "Jupiler 50 Cl | 5,2%", price: "€ 5,40" },
      { name: "Duvel | 8,5%", price: "€ 5,00" },
      { name: "Omer | 8%", price: "€ 5,00" },
      { name: "Leffe Blond | 6,6%", price: "€ 4,00" },
      { name: "Leffe Bruin | 6,5%", price: "€ 4,00" },
      { name: "Liefmans Fruitesse | 3,8%", price: "€ 3,50" },
      { name: "Liefmans Peach", price: "€ 3,50" },
      { name: "Hoegaarden Wit | 4,9%", price: "€ 3,50" },
      { name: "Hoegaarden Rosée | 3%", price: "€ 3,50" },
      { name: "Lindemans Framboise | 2,5%", price: "€ 4,00" },
      { name: "Lindemans Apple | 3,5%", price: "€ 5,00" },
      { name: "Kasteel Rouge | 8%", price: "€ 5,00" },
      { name: "Kasteel Tripel | 11%", price: "€ 5,00" },
      { name: "Kasteel Tropical | 7%", price: "€ 5,00" },
      { name: "Keyte Oosténdse Tripel", price: "€ 4,50" },
      { name: "Keyte-Dobbel-Tripel", price: "€ 4,50" },
      { name: "Rodenbach Classic | 5,2%", price: "€ 3,50" },
      { name: "Chimay Blauw | 9%", price: "€ 5,00" },
      { name: "Brugse Zot | 6%", price: "€ 5,00" },
      { name: "Tripel d'Anvers | 8%", price: "€ 5,00" },
      { name: "Westmalle Tripel | 9,5%", price: "€ 5,00" },
      { name: "Westmalle Dubbel | 7%", price: "€ 5,00" },
      { name: "Gouden Carolus Classic | 8,5%", price: "€ 5,00" },
      { name: "Gouden Carolus Tripel | 9%", price: "€ 5,00" },
      { name: "Gouden Carolus Whisky Infused | 11,7%", price: "€ 5,00" },
      { name: "Carlsberg | 5%", price: "€ 3,50" },
      { name: "Orval | 6,2%", price: "€ 5,00" },
      { name: "Cornet Oaked | 8,5%", price: "€ 5,00" },
      { name: "Vedett Extra White | 4,7%", price: "€ 4,00" },
      { name: "Vedett Extra Pilsner | 5,2%", price: "€ 4,00" },
      { name: "Coast Blond | 7%", price: "€ 5,00" },
      { name: "Coast Dark | 8%", price: "€ 5,00" },
      { name: "Boon Oude Geuze 25cl | 7%", price: "€ 4,00" },
      { name: "Boon Kriek 25cl | 4%", price: "€ 5,00" },
      { name: "Boon Framboise 25cl | 5%", price: "€ 5,00" },
      { name: "Boon Oude Geuze 37,5cl | 7%", price: "€ 6,00" },
      { name: "Boon Kriek 37,5cl | 4%", price: "€ 9,50" },
      { name: "Duivelsbier Wild | 6,3%", price: "€ 8,00" },
      { name: "Duivelsbier Donker | 8%", price: "€ 7,00" },
    ]
  },
  {
    id: "witte-wijn",
    title: "Witte Wijn",
    items: [
      { name: "Les Rochettes Wit", price: "€ 5,50" },
      { name: "Les Rochettes Wit (Fles)", price: "€ 24,00" },
      { name: "Les Silex Sauvignon", price: "€ 8,00" },
      { name: "Les Silex Sauvignon (Fles)", price: "€ 34,00" },
      { name: "No Excuse Chardonnay", price: "€ 7,00" },
      { name: "No Excuse Chardonnay (Fles)", price: "€ 32,00" },
      { name: "Mâcon-Chardonnay", price: "€ 42,00" },
      { name: "Weingut Keth Riesling", price: "€ 34,00" },
      { name: "Terroir et Vignobles Moelleux | zoet", price: "€ 7,00" },
      { name: "Terroir et Vignobles Moelleux | zoet (Fles)", price: "€ 34,00" },
    ]
  },
  {
    id: "rode-wijn",
    title: "Rode Wijn",
    items: [
      { name: "Les Rochettes Rood Glas", price: "€ 5,50" },
      { name: "Les Rochettes Rood Fles", price: "€ 24,00" },
      { name: "Pure Altitude Pinot Noir Fles", price: "€ 32,00" },
      { name: "Lornano Le Bandito Chianti Fles", price: "€ 49,00" },
      { name: "Domaine de la Vierge Romaine", price: "€ 48,00" },
      { name: "Château Peyreau", price: "€ 50,00" },
      { name: "Château Peyreau ½ Fles", price: "€ 29,00" },
      { name: "Château Peyreau Magnum", price: "€ 98,00" },
    ]
  },
  {
    id: "rose-wijn",
    title: "Rosé Wijn",
    items: [
      { name: "Gris Blanc Rosé Glas", price: "€ 5,50" },
      { name: "Les Rochettes Rosé Glas", price: "€ 5,50" },
      { name: "Les Rochettes Rosé Fles", price: "€ 24,00" },
      { name: "Altés L'Espontania Rosé Glas", price: "€ 8,50" },
      { name: "Altés L'Espontania Rosé Fles", price: "€ 35,00" },
      { name: "Château de Font Vive Rosé Fles", price: "€ 49,00" },
    ]
  },
  {
    id: "bubbels",
    title: "Bubbels",
    items: [
      { name: "Cava Brisa Nova Glas", price: "€ 8,50" },
      { name: "Cava Brisa Nova Fles", price: "€ 35,00" },
      { name: "Champagne Charles Latour Glas", price: "€ 12,50" },
      { name: "Champagne Charles Latour Fles", price: "€ 62,00" },
      { name: "Champagne Barbichon", price: "Op aanvraag" },
      { name: "Champagne Vranken Fles", price: "€ 49,00" },
    ]
  },
  {
    id: "alcoholvrij",
    title: "0,0 Alcohol",
    items: [
      { name: "Stella 0,0", price: "€ 2,80" },
      { name: "Liefmans Fruitesse 0,0", price: "€ 3,50" },
      { name: "Liefmans Peach 0,0", price: "€ 3,50" },
      { name: "Lindemans kriek 0,0", price: "€ 4,00" },
      { name: "Lindemans Pecheresse 0,0", price: "€ 4,00" },
      { name: "Coast Zero", price: "€ 5,00" },
      { name: "Carlsberg 0,0", price: "€ 3,40" },
      { name: "Sport Zot Alcoholvrij", price: "€ 4,50" },
      { name: "Kasteelbier Rouge 0,0", price: "€ 5,00" },
      { name: "Kasteelbier Tropical 0,0", price: "€ 5,00" },
      { name: "Leffe Blond/Bruin 0,0", price: "€ 4,00" },
      { name: "Hoegaarden Citrus 0,0", price: "€ 3,50" },
      { name: "Tripel Karmeliet Alcoholvrij", price: "€ 4,50" },
      { name: "Keth Pinot Blanc 0,0", price: "€ 7,00" },
      { name: "Divin Pinot Noir 0,0", price: "€ 7,00" },
      { name: "Virgin Mojito", price: "€ 9,50" },
      { name: "Virgin Piña Colada", price: "€ 9,50" },
      { name: "Kidibul", price: "€ 5,50" },
      { name: "Funny Pisang Orange", price: "€ 9,50" },
      { name: "Gordon's 0,0 Premium Pink Gin (inclusief tonic)", price: "€ 9,50" },
    ]
  }
];

const Menu = () => {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  // Intersection observer → highlight active category in sticky nav
  useEffect(() => {
    const ids = menuCategories.map((c) => c.id);
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
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll nav pill into view when active changes
  useEffect(() => {
    if (!navRef.current) return;
    const btn = navRef.current.querySelector(`[data-cat="${activeId}"]`);
    if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <div className="bg-latte-100 min-h-screen">
      <SEO
        title="Drankkaart | COZY Moments Blankenberge"
        description="Bekijk onze uitgebreide drankkaart met koffie, thee, wijnen, bieren en cocktails. Geniet van een heerlijk moment bij COZY Moments."
        canonical="https://cozy-moments.be/menu"
      />
      <PageHero
        title="Drankkaart"
        subtitle="Onze Kaart"
        description="Geniet van onze zorgvuldig samengestelde selectie dranken."
        imageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* ── Sticky category nav ── */}
      <div className="sticky top-20 sm:top-24 z-40 bg-latte-100/80 backdrop-blur-xl border-b border-coffee-900/5">
        <div
          ref={navRef}
          className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto scrollbar-hide py-3"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => {
                document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ${
                activeId === cat.id
                  ? 'bg-coffee-900 text-latte-100'
                  : 'bg-transparent text-coffee-700 hover:bg-coffee-900/5'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu sections ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
        {menuCategories.map((category, catIdx) => (
          <section key={category.id} id={category.id} className="scroll-mt-36 sm:scroll-mt-40">
            {/* Category header — large editorial type */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="mb-10"
            >
              <span className="text-[10px] font-mono text-coffee-900/20 uppercase tracking-widest">
                {String(catIdx + 1).padStart(2, '0')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-coffee-900 mt-1 leading-tight">
                {category.title}
              </h2>
              <div className="mt-4 h-px w-16 bg-gold-500" />
            </motion.div>

            {/* Items — editorial list, no white boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
              {category.items.map((item, itemIdx) => (
                <motion.div
                  key={itemIdx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(itemIdx * 0.03, 0.3), ease }}
                  className={`flex items-baseline justify-between py-3 border-b border-coffee-900/5 group ${
                    item.isExtra ? 'pl-5' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className={`${
                        item.isExtra
                          ? 'text-sm text-coffee-600 font-sans'
                          : 'text-base font-sans font-medium text-coffee-900 group-hover:text-gold-600 transition-colors duration-200'
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.desc && (
                      <span className="block text-xs text-coffee-500 italic mt-0.5">{item.desc}</span>
                    )}
                  </div>
                  <span
                    className={`ml-4 flex-shrink-0 tabular-nums ${
                      item.isExtra
                        ? 'text-sm text-coffee-500'
                        : 'text-sm font-semibold text-coffee-800'
                    }`}
                  >
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>

            {category.note && (
              <p className="mt-6 text-xs text-coffee-500 italic font-sans">{category.note}</p>
            )}
          </section>
        ))}
      </div>

      {/* ── Bottom callout ── */}
      <div className="bg-coffee-900 text-latte-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            Kleine extra's maken
            <span className="italic text-gold-500"> het moment</span>
          </p>
          <p className="mt-4 text-sm text-latte-200/60 font-sans max-w-md mx-auto">
            Zin in een schijfje citroen of extra ijsblokjes? Vraag het gerust, wij regelen het graag!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
