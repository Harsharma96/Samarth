/**
 * CENTRAL CONFIGURATION
 * -------------------------------------------------------------
 * Every phone number, address, price, product and delivery charge
 * used anywhere on the website is defined in this single file.
 * Edit here and the whole site updates.
 */

import heroSpicesLux from "@/assets/hero-spices-lux.jpg";
import heroImg1 from "@/assets/hero-1.jpg";
import heroImg2 from "@/assets/hero-2.jpg";
import heroImg3 from "@/assets/hero-3.jpg";
import heroImg4 from "@/assets/hero-4.jpg";
import imgVadapav from "@/assets/prod-vadapav.jpg";
import imgSamosa from "@/assets/prod-samosa.jpg";
import imgMisal from "@/assets/prod-misal.jpg";
import imgTea from "@/assets/prod-tea.jpg";
import imgCoffee from "@/assets/prod-coffee.jpg";
import imgPremix from "@/assets/prod-premix.jpg";
import imgShira from "@/assets/prod-shira.jpg";
import imgUpma from "@/assets/prod-upma.jpg";
import imgGaram from "@/assets/prod-garam.jpg";
import imgPavBhaji from "@/assets/prod-pavbhaji.jpg";
import imgBiryani from "@/assets/prod-biryani.jpg";
import imgMasalaRed from "@/assets/prod-masala-red.jpg";

export const brand = {
  name: "Samarth Spices & Premixes",
  nameMr: "Samarth Spices & Premixes",
  nameEn: "Samarth Spices & Premixes",
  short: "Samarth",
  sub: "Spices & Premixes",
  tagline: "Purity • Taste • Tradition",
  promise: "Authentic Taste. Premium Quality. Traditional Flavours.",
  phone: "9370833883",
  whatsapp: "9766869536",
  instagram: "@samarthmasale",
  address: ["Aishwaryam Hamara,", "Dehu Alandi Road,", "Moshi, Pune - 411062"],
};

export const announcements = [
  "🌶️ Authentic Taste • Pure Spices • Premium Quality",
  "🔥 Freshly Ground Masalas & Instant Premixes",
  "🚚 Fast Delivery Across Maharashtra & All India",
  "📦 500g and 1kg Value Packs Available",
  "✨ Wholesale & Bulk Orders Welcome",
  "🛍️ Direct Factory Rates for Retail & Bulk Buyers",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Masale", href: "#masala-collection" },
  { label: "Premix", href: "#shop" },
  { label: "Best Sellers", href: "#best-sellers" },
  { label: "Wholesale", href: "#wholesale" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroSlides = [
  {
    image: heroSpicesLux,
    titleMr: "Authentic Maharashtrian Spices & Instant Premixes",
    kicker: "Purity • Taste • Tradition",
    subtitle: "Traditional homestyle flavors crafted from 100% pure, hand-picked natural spices.",
    cta: "Shop Spices Now",
    href: "#shop",
    alt: "Aromatic authentic Indian spices in brass and terracotta bowls",
  },
  {
    image: heroImg2,
    titleMr: "Instant Breakfast & Royal Tea in Just 5 Minutes",
    kicker: "Instant Ready Premix • Ready In 5 Mins",
    subtitle: "Just add hot water or milk for delicious, steaming hot homestyle breakfast on the go!",
    cta: "Explore Premixes",
    href: "#shop",
    alt: "Instant ready to cook breakfast premixes and tea",
  },
  {
    image: heroImg3,
    titleMr: "Vada Pav, Misal & Dum Biryani Special Masalas",
    kicker: "Signature Blends • Authentic Spiciness",
    subtitle: "Bring authentic Pune and Kolhapur zest to your cooking — zero artificial colors or preservatives.",
    cta: "Explore Special Blends",
    href: "#masala-collection",
    alt: "Colorful rich authentic ground spice powders",
  },
  {
    image: heroImg4,
    titleMr: "Wholesale & Bulk Supply for Hotels & Caterers",
    kicker: "Direct From Factory • Special Wholesale Discounts",
    subtitle: "1kg to 50kg hygienic bulk packs with prompt dispatch across Pune and all of India.",
    cta: "View Wholesale Rates",
    href: "#wholesale",
    alt: "Bulk jute sacks filled with red chilli powder and turmeric",
  },
  {
    image: heroImg1,
    titleMr: "Hygiene • Flavor • 100% Guaranteed Purity",
    kicker: "Generations of Trust • 100% Pure",
    subtitle: "No artificial fillers or synthetic colors — completely wholesome and healthy for your family.",
    cta: "Order Now",
    href: "#shop",
    alt: "Premium Indian spice bowls in warm golden light",
  },
];

export const categories = [
  { emoji: "🌶️", name: "Masala", filter: "Masala", image: imgMasalaRed },
  { emoji: "🍛", name: "Ready Premix", filter: "Ready Premix", image: imgPremix },
  { emoji: "☕", name: "Beverage Premix", filter: "Beverage Premix", image: imgTea },
  { emoji: "🔥", name: "Spicy Masala", filter: "Spicy Masala", image: imgMisal },
  { emoji: "🍽️", name: "Breakfast Premix", filter: "Breakfast Premix", image: imgUpma },
  { emoji: "🥘", name: "Cooking Masala", filter: "Cooking Masala", image: imgBiryani },
  { emoji: "🧂", name: "Special Blends", filter: "Special Blends", image: imgGaram },
  { emoji: "📦", name: "Wholesale", filter: "Wholesale", image: heroImg4 },
];

export type Product = {
  id: string;
  name: string;
  nameMr?: string;
  category: string;
  pack: string;
  mrp: number;
  price: number;
  bulkRate?: number;
  wholesaleRate?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  ingredients: string;
  howToUse: string;
  /** true = placeholder pricing that can be replaced later */
  demoPricing?: boolean;
};

/** The 11 products below keep the exact supplied pack sizes and pricing. */
export const products: Product[] = [
  {
    id: "vadapav-ready-masala",
    name: "Vada Pav Ready Masala",
    nameMr: "Vada Pav Ready Masala",
    category: "Spicy Masala",
    pack: "200g",
    mrp: 100,
    price: 89,
    bulkRate: 350,
    wholesaleRate: 340,
    rating: 4.9,
    reviews: 412,
    image: imgVadapav,
    badge: "BEST SELLER",
    description:
      "Fiery dry garlic chutney blend that gives vada pav its unmistakable Mumbai street-style punch.",
    ingredients: "Dry garlic, red chilli, roasted groundnut, dry coconut, salt.",
    howToUse: "Sprinkle generously inside the pav or over hot vada before serving.",
  },
  {
    id: "samosa-ready-masala",
    name: "Samosa Ready Masala",
    nameMr: "Samosa Ready Masala",
    category: "Ready Premix",
    pack: "100g",
    mrp: 60,
    price: 54,
    bulkRate: 400,
    wholesaleRate: 390,
    rating: 4.8,
    reviews: 318,
    image: imgSamosa,
    badge: "POPULAR",
    description:
      "A perfectly balanced blend for the classic samosa filling — aromatic, warm and never overpowering.",
    ingredients: "Coriander, cumin, fennel, dry mango, black pepper, salt.",
    howToUse: "Mix 10g per 250g of boiled potato filling. Stuff, fold and fry.",
  },
  {
    id: "misal-premix-red",
    name: "Misal Premix (Red)",
    nameMr: "Misal Premix (Red)",
    category: "Spicy Masala",
    pack: "50g",
    mrp: 60,
    price: 54,
    bulkRate: 700,
    wholesaleRate: 690,
    rating: 4.9,
    reviews: 265,
    image: imgMisal,
    badge: "BEST SELLER",
    description:
      "Authentic Maharashtrian kat blend for a deep red, spicy misal rassa in minutes.",
    ingredients: "Red chilli, coriander, coconut, onion, garlic, warm spices.",
    howToUse: "Add 50g premix to 1 litre water with boiled usal. Simmer 10 minutes.",
  },
  {
    id: "sakhar-chaha-premix",
    name: "Sugar Tea Amruttulya Premix",
    nameMr: "Sugar Tea Amruttulya Premix",
    category: "Beverage Premix",
    pack: "160g",
    mrp: 60,
    price: 54,
    bulkRate: 300,
    wholesaleRate: 290,
    rating: 4.7,
    reviews: 198,
    image: imgTea,
    badge: "POPULAR",
    description:
      "Amruttulya-style sugar tea premix — just add hot water and milk for that tapri chai taste.",
    ingredients: "Tea, sugar, milk solids, cardamom, ginger, tea masala.",
    howToUse: "Add 20g to 150ml hot water, stir and serve.",
  },
  {
    id: "gul-chaha-premix",
    name: "Jaggery Tea Amruttulya Premix",
    nameMr: "Jaggery Tea Amruttulya Premix",
    category: "Beverage Premix",
    pack: "160g",
    mrp: 60,
    price: 54,
    bulkRate: 300,
    wholesaleRate: 290,
    rating: 4.7,
    reviews: 176,
    image: imgTea,
    description:
      "Jaggery tea premix with a warm, earthy sweetness — a healthier take on everyday chai.",
    ingredients: "Tea, jaggery, milk solids, cardamom, dry ginger.",
    howToUse: "Add 20g to 150ml hot water, stir well and serve hot.",
  },
  {
    id: "hot-coffee-premix",
    name: "Hot Coffee Premix",
    nameMr: "Hot Coffee Premix",
    category: "Beverage Premix",
    pack: "100g",
    mrp: 100,
    price: 89,
    bulkRate: 400,
    wholesaleRate: 390,
    rating: 4.8,
    reviews: 221,
    image: imgCoffee,
    badge: "PREMIUM",
    description: "Rich, frothy café-style hot coffee in one stir. No machine needed.",
    ingredients: "Instant coffee, sugar, dairy whitener.",
    howToUse: "Add 20g to 150ml hot water or milk. Stir and enjoy.",
  },
  {
    id: "cold-coffee-premix",
    name: "Cold Coffee Premix",
    nameMr: "Cold Coffee Premix",
    category: "Beverage Premix",
    pack: "100g",
    mrp: 100,
    price: 89,
    bulkRate: 400,
    wholesaleRate: 390,
    rating: 4.7,
    reviews: 164,
    image: imgCoffee,
    description: "Thick, creamy cold coffee — blend with chilled milk and ice.",
    ingredients: "Instant coffee, sugar, dairy whitener, cocoa.",
    howToUse: "Blend 25g with 200ml chilled milk and ice.",
  },
  {
    id: "gravy-premix-red",
    name: "Red Gravy Premix",
    nameMr: "Red Gravy Premix",
    category: "Cooking Masala",
    pack: "50g",
    mrp: 60,
    price: 54,
    bulkRate: 700,
    wholesaleRate: 690,
    rating: 4.8,
    reviews: 143,
    image: imgMasalaRed,
    badge: "BULK AVAILABLE",
    description:
      "An all-purpose red gravy base for sabzi, paneer and chicken curries in restaurant style.",
    ingredients: "Onion, tomato, cashew, red chilli, coriander, warm spices.",
    howToUse: "Add 50g to 500ml water, simmer and add your vegetables or paneer.",
  },
  {
    id: "pohe-premix",
    name: "Poha Premix",
    nameMr: "Poha Premix",
    category: "Breakfast Premix",
    pack: "333g",
    mrp: 100,
    price: 89,
    bulkRate: 200,
    wholesaleRate: 190,
    rating: 4.8,
    reviews: 289,
    image: imgPremix,
    badge: "BEST SELLER",
    description: "Maharashtrian kanda pohe ready in 5 minutes — soft, yellow and perfectly spiced.",
    ingredients: "Poha, turmeric, mustard, curry leaf, peanut, sugar, salt.",
    howToUse: "Add premix to hot water, cover for 4 minutes, fluff and serve with lemon.",
  },
  {
    id: "shira-premix",
    name: "Sheera Premix",
    nameMr: "Sheera Premix",
    category: "Breakfast Premix",
    pack: "333g",
    mrp: 100,
    price: 89,
    bulkRate: 200,
    wholesaleRate: 190,
    rating: 4.7,
    reviews: 167,
    image: imgShira,
    description: "Ghee-rich rava shira with cashew and raisins — perfect for prasad and breakfast.",
    ingredients: "Roasted rava, sugar, cashew, raisin, cardamom.",
    howToUse: "Add premix to boiling water with ghee, stir 3 minutes until thick.",
  },
  {
    id: "upma-premix",
    name: "Upma Premix",
    nameMr: "Upma Premix",
    category: "Breakfast Premix",
    pack: "333g",
    mrp: 100,
    price: 89,
    bulkRate: 200,
    wholesaleRate: 190,
    rating: 4.7,
    reviews: 154,
    image: imgUpma,
    badge: "POPULAR",
    description: "Fluffy South-Indian style upma with curry leaves, cashew and vegetables.",
    ingredients: "Roasted rava, vegetables, curry leaf, mustard, cashew, salt.",
    howToUse: "Add premix to boiling water, stir, cover 4 minutes and serve hot.",
  },

  /* ---- Additional catalog products: DEMO / PLACEHOLDER pricing ---- */
  {
    id: "pav-bhaji-masala",
    name: "Pav Bhaji Masala",
    category: "Cooking Masala",
    pack: "100g",
    mrp: 90,
    price: 79,
    rating: 4.6,
    reviews: 98,
    image: imgPavBhaji,
    demoPricing: true,
    description: "Buttery, tangy Mumbai pav bhaji masala with a deep red colour.",
    ingredients: "Coriander, red chilli, dry mango, black salt, warm spices.",
    howToUse: "Add 15g while mashing the bhaji. Finish with butter and lemon.",
  },
  {
    id: "chaat-masala",
    name: "Chaat Masala",
    category: "Special Blends",
    pack: "100g",
    mrp: 80,
    price: 69,
    rating: 4.6,
    reviews: 87,
    image: imgMasalaRed,
    demoPricing: true,
    description: "Zesty black-salt chaat masala for fruits, salads and street snacks.",
    ingredients: "Black salt, dry mango, cumin, mint, asafoetida.",
    howToUse: "Sprinkle over chaat, fruit, raita or fries.",
  },
  {
    id: "garam-masala",
    name: "Garam Masala",
    category: "Special Blends",
    pack: "100g",
    mrp: 120,
    price: 105,
    rating: 4.8,
    reviews: 132,
    image: imgGaram,
    badge: "PREMIUM",
    demoPricing: true,
    description: "Stone-ground warm spice blend of cinnamon, clove, cardamom and black pepper.",
    ingredients: "Cinnamon, clove, cardamom, black pepper, bay leaf, nutmeg.",
    howToUse: "Add 5g at the end of cooking to finish any curry.",
  },
  {
    id: "biryani-masala",
    name: "Biryani Masala",
    category: "Cooking Masala",
    pack: "100g",
    mrp: 130,
    price: 110,
    rating: 4.7,
    reviews: 76,
    image: imgBiryani,
    demoPricing: true,
    description: "Aromatic dum biryani blend for fragrant, restaurant-style rice.",
    ingredients: "Shahi jeera, star anise, mace, cardamom, coriander, chilli.",
    howToUse: "Use 20g per 500g rice while layering the dum.",
  },
  {
    id: "chole-masala",
    name: "Chole Masala",
    category: "Cooking Masala",
    pack: "100g",
    mrp: 90,
    price: 79,
    rating: 4.5,
    reviews: 64,
    image: imgMasalaRed,
    demoPricing: true,
    description: "Dark, tangy Punjabi chole masala with anardana and dry mango.",
    ingredients: "Anardana, dry mango, coriander, chilli, black cardamom.",
    howToUse: "Add 15g per 250g soaked chickpeas while simmering.",
  },
  {
    id: "paneer-masala",
    name: "Paneer Masala",
    category: "Cooking Masala",
    pack: "100g",
    mrp: 110,
    price: 95,
    rating: 4.6,
    reviews: 58,
    image: imgPavBhaji,
    demoPricing: true,
    description: "Creamy, mildly spiced blend made for paneer butter masala and tikka gravies.",
    ingredients: "Cashew, kasuri methi, coriander, chilli, cardamom.",
    howToUse: "Add 15g to onion-tomato base, then add paneer and cream.",
  },
  {
    id: "tea-masala",
    name: "Tea Masala",
    category: "Special Blends",
    pack: "50g",
    mrp: 70,
    price: 59,
    rating: 4.7,
    reviews: 91,
    image: imgTea,
    demoPricing: true,
    description: "Strong ginger-cardamom chai masala that lifts every cup.",
    ingredients: "Dry ginger, cardamom, clove, cinnamon, black pepper.",
    howToUse: "Add a pinch per cup while boiling the tea.",
  },
  {
    id: "kitchen-king-masala",
    name: "Kitchen King Masala",
    category: "Special Blends",
    pack: "100g",
    mrp: 100,
    price: 89,
    rating: 4.5,
    reviews: 47,
    image: imgGaram,
    demoPricing: true,
    description: "The everyday all-rounder blend for any sabzi in your kitchen.",
    ingredients: "Coriander, turmeric, chilli, cumin, warm spices.",
    howToUse: "Add 10g to any vegetable while cooking.",
  },
  {
    id: "special-maharashtrian-masala",
    name: "Special Maharashtrian Masala",
    category: "Special Blends",
    pack: "200g",
    mrp: 160,
    price: 139,
    rating: 4.9,
    reviews: 112,
    image: imgMasalaRed,
    badge: "NEW",
    demoPricing: true,
    description: "Traditional goda-style kala masala roasted the slow, old-fashioned way.",
    ingredients: "Dry coconut, sesame, stone flower, chilli, coriander, warm spices.",
    howToUse: "Use 10g in amti, bharli vangi, usal or any Maharashtrian sabzi.",
  },
];

export const bestSellerIds = [
  "vadapav-ready-masala",
  "samosa-ready-masala",
  "misal-premix-red",
  "pohe-premix",
  "upma-premix",
  "hot-coffee-premix",
];

export const premixIds = [
  "pohe-premix",
  "upma-premix",
  "shira-premix",
  "misal-premix-red",
  "vadapav-ready-masala",
  "samosa-ready-masala",
  "hot-coffee-premix",
  "cold-coffee-premix",
];

export const masalaIds = [
  "vadapav-ready-masala",
  "samosa-ready-masala",
  "misal-premix-red",
  "gravy-premix-red",
  "garam-masala",
  "pav-bhaji-masala",
  "chaat-masala",
  "biryani-masala",
];

/** Products shown in the Price List 2026 table (the 11 supplied items). */
export const priceListIds = products.filter((p) => !p.demoPricing).map((p) => p.id);

export const offer = {
  headline: "MASALA MAGIC OFFER",
  discountLabel: "Flat 15% OFF",
  code: "MASALA15",
  percent: 15,
  /** Countdown target — offer ends this many hours from first page load. */
  endsInHours: 72,
};

export const delivery = {
  cards: [
    { title: "500 Grams", value: "₹70/-", note: "Standard delivery" },
    { title: "1 Kilogram", value: "₹80/-", note: "Standard delivery" },
    { title: "Maharashtra", value: "₹100/-", note: "For 500g to 1kg packs" },
    { title: "1kg – 20kg", value: "₹300/-", note: "Bulk transport charge" },
    { title: "All India", value: "Next Day", note: "Express delivery" },
  ],
  booking: "Orders will be dispatched and delivered within 5 days of booking.",
};

export const whyChoose = [
  { emoji: "🌶️", title: "Carefully Selected Spices", text: "Hand-picked whole spices, cleaned and graded before grinding." },
  { emoji: "✨", title: "Premium Quality", text: "Small-batch blending so every pack keeps its aroma and colour." },
  { emoji: "🇮🇳", title: "Indian Traditional Flavours", text: "Recipes rooted in authentic Maharashtrian home cooking." },
  { emoji: "📦", title: "Hygienic Packaging", text: "Food-grade, moisture-sealed packs for longer freshness." },
  { emoji: "🚚", title: "Fast Delivery", text: "Dispatch across Maharashtra and next-day delivery across India." },
  { emoji: "🏪", title: "Retail & Wholesale", text: "From a single pack to 20+ kg bulk supply at special rates." },
];

export const storyFeatures = [
  { emoji: "🌶️", title: "Authentic Ingredients", text: "Sourced from trusted growers across India." },
  { emoji: "👨‍🍳", title: "Traditional Flavours", text: "Blended to time-tested family recipes." },
  { emoji: "✨", title: "Premium Quality", text: "No shortcuts, no fillers, no compromise." },
];

export const reviews = [
  { name: "Snehal Kulkarni", city: "Pune", text: "Vadapav masala gives a really authentic street-style taste.", rating: 5 },
  { name: "Amit Deshmukh", city: "Nashik", text: "Premixes are very convenient and taste delicious.", rating: 5 },
  { name: "Priya Jadhav", city: "Mumbai", text: "Good packaging and excellent masala quality.", rating: 5 },
  { name: "Rahul Pawar", city: "Nagpur", text: "Ordered in bulk and the overall experience was smooth.", rating: 5 },
  { name: "Sunita Shinde", city: "Kolhapur", text: "Misal and Dum Biryani blends have the exact rich traditional aroma we love.", rating: 5 },
  { name: "Vikram Patil", city: "Satara", text: "The instant chai premix and breakfast upma are pure lifesavers on busy mornings.", rating: 5 },
];

export const ratingSummary = {
  score: 4.8,
  count: "2,500+",
  bars: [
    { star: 5, percent: 82 },
    { star: 4, percent: 12 },
    { star: 3, percent: 4 },
    { star: 2, percent: 1 },
    { star: 1, percent: 1 },
  ],
};

export const reels = [
  { image: imgVadapav, caption: "Street-style vada pav at home 🔥" },
  { image: imgMisal, caption: "Kolhapuri misal in 10 minutes" },
  { image: imgPremix, caption: "Perfect kanda pohe, every time" },
  { image: imgTea, caption: "Amruttulya chai secret ☕" },
  { image: imgSamosa, caption: "Crispy samosa masala filling" },
  { image: imgBiryani, caption: "Dum biryani masala magic" },
];

export const instagramPosts = [
  imgMasalaRed,
  imgVadapav,
  imgPavBhaji,
  imgUpma,
  imgGaram,
  imgMisal,
  imgCoffee,
  imgShira,
];

export const faqs = [
  {
    q: "What products does Samarth Masale offer?",
    a: "We make authentic Indian masalas, ready-to-use cooking premixes, breakfast premixes like pohe, upma and shira, plus tea and coffee beverage premixes.",
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes. Special wholesale rates apply on 20+ kg orders, with bulk rates for 1–20 kg. Call or WhatsApp us for a quotation.",
  },
  {
    q: "What pack sizes are available?",
    a: "Sample packs from 50g to 333g for retail, and 500g / 1kg and larger bulk packing for wholesale buyers.",
  },
  { q: "Do you deliver across India?", a: "Yes. We deliver across Maharashtra and offer next-day delivery across India." },
  { q: "How can I place a bulk order?", a: "Use the Get Wholesale Price button, or WhatsApp us with the products and quantity you need." },
  {
    q: "What is the delivery charge?",
    a: "₹70 for 500g and ₹80 for 1kg. Other places in Maharashtra are ₹100 for 500g–1kg. Transport charge for 1kg to 20kg is ₹300.",
  },
  { q: "How can I order through WhatsApp?", a: `Message us on ${brand.whatsapp} with your product list and delivery pincode and we will confirm your order.` },
  { q: "How can I contact customer support?", a: `Call ${brand.phone} or WhatsApp ${brand.whatsapp}, any day between 9 AM and 8 PM.` },
  { q: "Are the premixes ready to use?", a: "Yes. Most premixes only need hot water or milk, and the full method is printed on every pack." },
  { q: "How can I download the price list?", a: "Use the Download Price List button in the Price List 2026 section to save the current rates." },
];

export const footerLinks = {
  shop: ["Masale", "Premix", "Best Sellers", "New Products", "Offers", "Wholesale"],
  company: ["About Us", "Our Story", "Contact", "Price List", "Blog"],
  help: ["FAQ", "Shipping", "Returns", "Track Order", "Privacy Policy", "Terms & Conditions"],
};

export const getProduct = (id: string) => products.find((p) => p.id === id)!;
export const getProducts = (ids: string[]) => ids.map(getProduct);
