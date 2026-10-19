/* All copy and listings for Pizza Equipment Mart. Facts from pizzaequipmentmart.com and the PEM sales sheets. */

export const BASE = "";
export const IMG = "/images";

export const PEM = {
  name: "Pizza Equipment Mart",
  tagline: "The marketplace built for the pizza industry.",
  contact: "Terrance Caldwell",
  phone: "360-918-1003",
  tel: "tel:3609181003",
  email: "terrancecaldwell@pizzaequipmentmart.com",
};

export const mailto = (to: string, subject: string) => `mailto:${to}?subject=${encodeURIComponent(subject)}`;

export type Photo = { src: string; alt: string; w: number; h: number };

export type Product = {
  name: string;
  code?: string;
  price?: string;
  unit?: string;
  points: string[];
  photo?: Photo;
};

export type Brand = {
  slug: string;
  name: string;
  short: string;
  category: string;
  logo: Photo;
  logoDark?: boolean;
  status: "listed" | "soon";
  headline: [string, string];
  intro: string;
  hero?: Photo;
  site?: string;
  siteLabel?: string;
  phone?: string;
  tel?: string;
  person?: string;
  email?: string;
  products: Product[];
  features: { h: string; p: string }[];
  extras?: { label: string; href: string }[];
  more?: string;
};

export type Category = { slug: string; name: string; group: "Ovens" | "Kitchen" | "Supplies" | "Deals"; blurb: string; photo?: Photo };

export const CATEGORIES: Category[] = [
  { slug: "conveyor-ovens", name: "Conveyor ovens", group: "Ovens", blurb: "Belt-fed ovens that bake the same pizza every time, at volume.",
    photo: { src: `${IMG}/avantec-3242-2.png`, alt: "Avantec 3242-2 stainless conveyor oven with two baking decks", w: 519, h: 375 } },
  { slug: "deck-ovens", name: "Deck ovens", group: "Ovens", blurb: "Stone and steel deck ovens for hand-stretched pies." },
  { slug: "fast-bake-ovens", name: "Fast bake ovens", group: "Ovens", blurb: "High-speed ovens that heat, brown and toast in a fraction of the time.",
    photo: { src: `${IMG}/pratica-fit-express.png`, alt: "Two Prática FIT Express high-speed ovens, one black and one orange", w: 520, h: 417 } },
  { slug: "refrigeration", name: "Refrigeration", group: "Kitchen", blurb: "Prep tables, make lines and cold storage." },
  { slug: "supplies", name: "Supplies", group: "Supplies", blurb: "Dough trays, scrapers, pans and bins that take a beating.",
    photo: { src: `${IMG}/wrh-trays.png`, alt: "Stacks of colored WRH dough trays on rolling dollies", w: 517, h: 458 } },
  { slug: "mixers", name: "Mixers", group: "Kitchen", blurb: "Spiral and planetary mixers sized for dough." },
  { slug: "dough-pressers-sheeters", name: "Dough pressers and sheeters", group: "Kitchen", blurb: "Consistent crusts without the hand stretch." },
  { slug: "slicers", name: "Slicers", group: "Kitchen", blurb: "Meat, cheese and vegetable slicers for the make line." },
  { slug: "work-tables", name: "Work tables", group: "Kitchen", blurb: "Stainless tables built for the prep station." },
  { slug: "shelving", name: "Shelving", group: "Kitchen", blurb: "Storage for the walk-in, the dry room and the line." },
  { slug: "refurbished-items", name: "Refurbished items", group: "Deals", blurb: "Used and demo equipment at discounted prices." },
  { slug: "scratch-dent", name: "Scratch and dent", group: "Deals", blurb: "New equipment with cosmetic marks, priced to move." },
];

export const BRANDS: Brand[] = [
  {
    slug: "avantec-ovens",
    name: "Avantec",
    short: "Avantec",
    category: "conveyor-ovens",
    logo: { src: `${IMG}/avantec-logo.png`, alt: "Avantec", w: 733, h: 171 },
    status: "listed",
    headline: ["Stack it to", "your rush."],
    intro: "Avantec conveyor ovens, priced by the belt. Stack two ovens with two, three or four belts and bake 150 to 300 pizzas an hour.",
    hero: { src: `${IMG}/stack-4.jpg`, alt: "Two Avantec 3242-2 conveyor ovens stacked for four belts", w: 640, h: 522 },
    site: "https://avantecovens.com",
    siteLabel: "avantecovens.com",
    phone: "859-802-5798",
    tel: "tel:8598025798",
    person: "David Goble",
    email: "avantecovens1@gmail.com",
    products: [
      { name: "Oven model 3242-1", code: "3242-1", price: "$13,950", unit: "Oven as shown",
        points: ["1 independent baking deck", "32” wide conveyor belt", "42” long baking chamber", "Natural gas or propane"],
        photo: { src: `${IMG}/stack-1.jpg`, alt: "Avantec 3242-1 single-deck conveyor oven on a caster stand", w: 640, h: 422 } },
      { name: "Oven model 3242-2", code: "3242-2", price: "$19,500", unit: "Oven as shown · $9,750 per belt",
        points: ["2 independent baking decks", "32” wide conveyor belt", "42” long baking chamber", "Natural gas or propane"],
        photo: { src: `${IMG}/stack-2.jpg`, alt: "Avantec 3242-2 conveyor oven with two baking decks", w: 640, h: 464 } },
      { name: "Oven model 2030-2", code: "2030-2", price: "$13,500", unit: "Oven as shown · $6,750 per belt",
        points: ["2 independent baking decks", "20” wide conveyor belt", "30” long baking chamber", "Natural gas or propane"] },
    ],
    features: [
      { h: "Flexibility", p: "Build the menu around the oven: up to six belt speeds and top air flow for perfect bakes on specialty items." },
      { h: "Performance", p: "Patented Avantec air flow and ample BTUs hold the bake steady at the rush. ECO settings save energy in the slow hours." },
      { h: "Capacity", p: "Stack two ovens with two, three or four belts. From 150 to 300 pizzas an hour." },
      { h: "Value", p: "There are more ways to save than a great price on the oven. Ask about split belts and leasing." },
    ],
  },
  {
    slug: "pratica-ovens",
    name: "Prática",
    short: "Prática",
    category: "fast-bake-ovens",
    logo: { src: `${IMG}/pratica-logo.png`, alt: "Prática High Speed Ovens", w: 265, h: 90 },
    logoDark: true,
    status: "listed",
    headline: ["Up to 20x", "faster."],
    intro: "Prática high-speed ovens combine impinged air and microwaves to heat, brown and toast up to twenty times faster than traditional methods.",
    hero: { src: `${IMG}/pratica-line.jpg`, alt: "The Prática FIT line of high-speed ovens with a toasted panini", w: 1280, h: 720 },
    site: "https://praticausa.com",
    siteLabel: "praticausa.com",
    phone: "214-584-6269",
    tel: "tel:2145846269",
    products: [
      { name: "FIT Express", code: "FIT Express",
        points: ["Dual 1,100W magnetrons for ultra-fast cooking", "Hybrid impingement and microwave control", "Ventless, compact, zero clearance", "Smart touchscreen with unlimited recipes", "Wi-Fi remote management and updates", "Includes paddle, baskets, sponge, USB drive, protector and cleaner"],
        photo: { src: `${IMG}/pratica-fit-express.png`, alt: "Two Prática FIT Express ovens, black and orange, with touchscreens", w: 520, h: 417 } },
    ],
    features: [
      { h: "Efficiency", p: "Impinged air plus microwaves heat, brown and toast up to 20 times faster than traditional methods." },
      { h: "Internet of Kitchen", p: "Build recipes and full menus on the oven or your computer, then send them to every connected oven by Wi-Fi or USB." },
      { h: "Footprint", p: "Maximum interior capacity in the smallest footprint. Made for tight kitchens." },
      { h: "Nine languages", p: "Portuguese, English, Spanish, French, German, Polish, Russian, Mandarin, Greek." },
    ],
    extras: [
      { label: "FIT Express spec card (PDF)", href: "/files/Spec-Sheet-Fit-Express-Sep-2025-Pratica-High-Speed-Ovens.pdf" },
      { label: "Watch it work", href: "https://www.youtube.com/watch?v=Ig8UmEBJ6Xg" },
    ],
  },
  {
    slug: "wrh-industries",
    name: "WRH Industries",
    short: "WRH",
    category: "supplies",
    logo: { src: `${IMG}/wrh-logo.jpg`, alt: "WRH Industries, Ltd.", w: 402, h: 87 },
    status: "listed",
    headline: ["Trays that last", "five years."],
    intro: "NSF listed and made in USA. WRH dough trays carry an unprecedented 5-year warranty against breakage, from blast freezer to steam cleaning.",
    hero: { src: `${IMG}/wrh-trays.png`, alt: "Stacks of red, green, blue, yellow and white WRH dough trays on dollies", w: 517, h: 458 },
    site: "https://www.wrhindustries.com",
    siteLabel: "wrhindustries.com",
    phone: "508-674-2444",
    tel: "tel:5086742444",
    products: [
      { name: "Dough trays", code: "BB 1826", price: "$18.50 each", unit: "Carton of 6",
        points: ["Color code dough sizes, allergens or production dates", "Four tray heights", "Cross-stack locks", "Custom colors and name plates"],
        photo: { src: `${IMG}/wrh-trays.png`, alt: "Stacked WRH dough trays on dollies", w: 517, h: 458 } },
      { name: "Hand scrapers", code: "DS-1", price: "$7.00 each", unit: "Carton of 6",
        points: ["Tapered blades hug corners", "Ergonomic handle reduces wrist fatigue", "5 HACCP colors", "Meets FDA, USDA and NSF", "Won't scratch metal, won't rust"],
        photo: { src: `${IMG}/wrh-hand-scrapers.png`, alt: "Red, green, blue and yellow WRH hand scrapers", w: 452, h: 369 } },
      { name: "Dough scrapers", code: "DS-2", price: "Ask", unit: "Pricing on request",
        points: [],
        photo: { src: `${IMG}/wrh-dough-scrapers.png`, alt: "A row of colored WRH dough scrapers", w: 626, h: 173 } },
    ],
    features: [
      { h: "5-year warranty", p: "Unprecedented warranty against breakage. Teflon copolymer surfaces won't wear off, harbor bacteria or absorb odors." },
      { h: "Freezer to steam", p: "Holds its shape from blast freezing to steam and autoclave cleaning. Scuff-resistant bottoms drain clean." },
      { h: "Value pricing", p: "Lease financing, factory-direct turnaround, and truckload, pallet and master pack pricing." },
      { h: "Made in USA", p: "NSF-listed designs, built to stack, lock and last." },
    ],
    more: "Also from WRH: full and half sheet pans, display trays, PTFE reusable pan liners, make line and SC-5 cheese bins, pasta drying trays.",
  },
  {
    slug: "adande",
    name: "Adande",
    short: "Adande",
    category: "refrigeration",
    logo: { src: `${IMG}/adande-logo.png`, alt: "Adande", w: 800, h: 157 },
    status: "soon",
    headline: ["Coming", "soon."],
    intro: "Adande refrigeration is coming to Pizza Equipment Mart.",
    products: [],
    features: [],
  },
];

export const brand = (slug: string) => BRANDS.find((b) => b.slug === slug);
export const category = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const brandsIn = (cat: string) => BRANDS.filter((b) => b.category === cat);

/* Categories shown in the grid, category bar, footer and sitemap: only ones with a listed brand
   (plus Scratch and dent). An empty category appears on its own once a listed brand is added to it. */
export const SHOWN = CATEGORIES.filter((c) =>
  c.slug === "scratch-dent" || BRANDS.some((b) => b.category === c.slug && b.status === "listed" && b.products.length > 0));

export const BENEFITS = [
  { h: "Reach active buyers", p: "Pizza operators, owners and equipment buyers shopping by category." },
  { h: "Drive traffic to your site", p: "Your logo sits on the homepage and links straight to your featured page and your own website." },
  { h: "Get direct inquiries", p: "One-tap call and text, email, and a quote form built around the details you need." },
  { h: "Show products 24/7", p: "Descriptions, pricing and spec sheets for your top products, always up." },
];

export const INCLUDED = [
  "Your logo on the homepage, linked to your page",
  "A featured company page with your top products, pricing and spec sheets",
  "Your key features and what sets you apart",
  "A contact section with one-tap call and text, email and a quote form",
  "Listings in every category you sell in",
  "Scratch and dent and refurbished listings for surplus stock",
];

export const GROWTH = [
  "Facebook and LinkedIn pages promoting listed products and brands",
  "Featured posts on your equipment, company and key offerings",
  "Targeted sharing in pizza industry Facebook groups",
];

export const STACKS = [
  { belts: 1, model: "Avantec 3242-1", line: "One oven, one deck", price: "$13,950", note: "32” belt · 42” chamber · natural gas or propane",
    img: { src: `${IMG}/stack-1.jpg`, alt: "Avantec 3242-1 single-deck conveyor oven on a caster stand", w: 640, h: 422 } },
  { belts: 2, model: "Avantec 3242-2", line: "One oven, two decks", price: "$19,500", note: "$9,750 per belt · two independent decks",
    img: { src: `${IMG}/stack-2.jpg`, alt: "Avantec 3242-2 conveyor oven with two independent baking decks", w: 640, h: 464 } },
  { belts: 3, model: "3242-1 + 3242-2", line: "Two ovens, three belts", price: "$13,950 + $19,500", note: "Stacked ovens bake 150 to 300 pizzas an hour",
    img: { src: `${IMG}/stack-3.jpg`, alt: "An Avantec 3242-1 stacked on a 3242-2 for three belts", w: 640, h: 488 } },
  { belts: 4, model: "3242-2 + 3242-2", line: "Two ovens, four belts", price: "2 x $19,500", note: "Stacked ovens bake 150 to 300 pizzas an hour",
    img: { src: `${IMG}/stack-4.jpg`, alt: "Two Avantec 3242-2 ovens stacked for four belts", w: 640, h: 522 } },
];
