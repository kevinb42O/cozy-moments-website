import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const menuCategories = [
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
      { name: "Champagne Barbichon", price: "" },
      { name: "Champagne Barbichon", price: "" },
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

  return (
    <div className="bg-latte-100 min-h-screen">
      <SEO 
        title="Drankkaart | COZY Moments Blankenberge"
        description="Bekijk onze uitgebreide drankkaart met koffie, thee, wijnen, bieren en cocktails. Geniet van een heerlijk moment bij COZY Moments."
        canonical="https://cozy-moments.be/menu"
      />
      {/* Hero Header */}
      <PageHero
        title="Drankkaart"
        subtitle="Onze Kaart"
        description="Geniet van onze zorgvuldig samengestelde selectie dranken. Van de perfecte koffie tot een verfrissend aperitief."
        imageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">
        <div className="space-y-16">
          {menuCategories.map((category, idx) => (
            <motion.div
              key={idx}
              id={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="scroll-mt-32 bg-white p-8 rounded-3xl shadow-sm border border-white/50"
            >
              <h2 className="text-3xl font-rounded font-bold text-coffee-800 mb-8 border-b border-coffee-100 pb-4 inline-block pr-12">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={`flex justify-between items-baseline group ${item.isExtra ? 'pl-4 text-sm opacity-80' : ''}`}>
                    <div className="flex-1">
                      <h3 className={`font-medium text-coffee-900 ${item.isExtra ? 'font-sans' : 'font-rounded text-lg'} group-hover:text-gold-500 transition-colors`}>
                        {item.name}
                      </h3>
                      {item.desc && (
                        <p className="text-sm text-coffee-700/60 italic mt-1 font-sans">{item.desc}</p>
                      )}
                    </div>
                    {item.price && (
                      <div className="flex items-baseline ml-4">
                        <div className="grow border-b border-dotted border-coffee-300 mx-2 w-12 opacity-30" />
                        <span className="font-sans font-bold text-coffee-800">{item.price}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {category.note && (
                <div className="mt-6 pt-4 border-t border-coffee-50 text-sm text-coffee-700/60 italic font-sans">
                  {category.note}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center space-y-4 bg-coffee-900 text-latte-100 p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-latte-100/10 rounded-full blur-2xl -ml-10 -mb-10" />
          
          <div className="relative z-10">
            <p className="font-rounded font-bold text-xl tracking-wide mb-2">KLEINE EXTRA'S MAKEN HET MOMENT</p>
            <p className="text-sm text-latte-200/80 italic font-sans max-w-lg mx-auto">
              ZIN IN EEN SCHIJFJE CITROEN OF EXTRA IJSBLOKJES? VRAAG HET GERUST, WIJ REGELEN HET GRAAG!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
