export interface Sneaker {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Nike' | 'Adidas' | 'New Balance' | 'Collaborations';
  tag: 'HOT DROP' | 'LIMITED' | 'TRENDING' | 'RESTOCK' | 'SPECIAL' | 'BESTSELLER' | 'HIGH DEMAND' | 'EXCLUSIVE' | 'VAULT GRAIL';
  image: string;
  description: string;
  sizes: string[];
  materials: string;
  colorway: string;
  sku: string;
  accentColor: string;
  gender: 'men' | 'women' | 'unisex';
  vaultDrop?: boolean;
  raffleEndsIn?: string;
  allocationLeft?: number;
}

export interface CartItem {
  product: Sneaker;
  quantity: number;
  size: string;
}

export const SNEAKERS_DATA: Sneaker[] = [
  // --- DROP 1 (Unisex / Flagship) ---
  {
    id: "snk-01",
    brand: "NIKE",
    name: "Air Jordan 1 High 'Retro Cyan'",
    price: 210,
    originalPrice: 240,
    category: "Nike",
    tag: "HOT DROP",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    description: "Heritage silhouette reimagined with premium full-grain leather & electric cyan overlays.",
    sizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 12"],
    materials: "Full-grain calfskin leather, encapsulated Air-Sole unit, rubber cupsole",
    colorway: "White / Electric Cyan / University Red",
    sku: "AJ1-2025-RCY",
    accentColor: "from-blue-600 to-cyan-500",
    gender: "unisex"
  },
  // --- MEN'S HEAVYWEIGHTS ---
  {
    id: "snk-02",
    brand: "ADIDAS ORIGINALS",
    name: "Yeezy Boost 700 'Wave Horizon'",
    price: 280,
    category: "Adidas",
    tag: "LIMITED",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    description: "Sculpted EVA midsole with responsive full-length Boost cushioning and futuristic mesh inserts.",
    sizes: ["US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 12"],
    materials: "Suede overlays, engineered mesh upper, full-length TPU wrapped Boost",
    colorway: "Grey / Chalk White / Core Black",
    sku: "YZY-700-WHZ",
    accentColor: "from-amber-600 to-orange-500",
    gender: "men"
  },
  {
    id: "snk-03",
    brand: "NEW BALANCE",
    name: "9060 'Sea Salt & Arctic Blue'",
    price: 175,
    category: "New Balance",
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    description: "Y2K-era futuristic aesthetics equipped with ABZORB and SBS dual-density cushioning.",
    sizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 11"],
    materials: "Premium pigskin suede, diamond patterned outsole, dual-density SBS pod midsole",
    colorway: "Sea Salt / Arctic Ice / Castlerock",
    sku: "NB-9060-SAB",
    accentColor: "from-sky-600 to-indigo-500",
    gender: "unisex"
  },
  {
    id: "snk-04",
    brand: "NIKE",
    name: "Dunk Low 'Industrial Cobalt'",
    price: 145,
    category: "Nike",
    tag: "RESTOCK",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    description: "Classic court icon crafted with crisp leather paneling, padded collar, and durable rubber traction.",
    sizes: ["US 5.5", "US 6", "US 7", "US 8", "US 8.5", "US 9", "US 10"],
    materials: "Smooth tumbled leather, perforated toe box, concentric pivot outsole",
    colorway: "Industrial Cobalt / Pure White / Sail",
    sku: "NK-DNK-ICB",
    accentColor: "from-blue-700 to-blue-500",
    gender: "women"
  },
  {
    id: "snk-05",
    brand: "ADIDAS",
    name: "Forum 84 Low 'Core Street'",
    price: 130,
    originalPrice: 150,
    category: "Adidas",
    tag: "SPECIAL",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
    description: "Retro basketball icon with criss-cross ankle strap and vintage off-white accents.",
    sizes: ["US 8", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 12"],
    materials: "Layered premium leather, nylon tongue, vintage aged midsole",
    colorway: "Core White / Night Indigo / Cream",
    sku: "ADI-FRM-84C",
    accentColor: "from-neutral-700 to-neutral-900",
    gender: "men"
  },
  {
    id: "snk-06",
    brand: "NEW BALANCE",
    name: "550 'Vintage Navy Shadow'",
    price: 140,
    category: "New Balance",
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Streamlined low-top inspired by late 80s hardwood icons, engineered for effortless daily wear.",
    sizes: ["US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 10"],
    materials: "Perforated leather upper, Ortholite insole, non-marking rubber outsole",
    colorway: "Vintage White / Navy Shadow / Crimson",
    sku: "NB-550-VNS",
    accentColor: "from-red-600 to-rose-700",
    gender: "women"
  },
  {
    id: "snk-07",
    brand: "NIKE",
    name: "Air Max Plus 'Volt Hyper'",
    price: 195,
    category: "Nike",
    tag: "HIGH DEMAND",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
    description: "Legendary Tuned Air technology with TPU ribcage design and high-contrast color gradations.",
    sizes: ["US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11"],
    materials: "Gradient synthetic mesh, TPU cage overlays, dual Tuned Air units",
    colorway: "Volt / Hyper Crimson / Black",
    sku: "NK-TN-VLT",
    accentColor: "from-red-500 to-amber-500",
    gender: "men"
  },
  {
    id: "snk-08",
    brand: "SALOMON",
    name: "XT-6 'Urban Tech Black/Ice'",
    price: 220,
    category: "Collaborations",
    tag: "EXCLUSIVE",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-distance trail icon embraced by modern techwear with Quicklace system and Agile Chassis.",
    sizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11"],
    materials: "Abrasion-resistant TPU film, welded mesh, Contagrip TA outsole",
    colorway: "Black / Phantom / Glacier Ice",
    sku: "SLM-XT6-UTB",
    accentColor: "from-emerald-600 to-teal-500",
    gender: "unisex"
  },
  // --- ADDITIONAL WOMEN'S STREETWEAR EDITIONS ---
  {
    id: "snk-09",
    brand: "NIKE",
    name: "Air Jordan 4 Retro 'Canyon Jade'",
    price: 215,
    originalPrice: 235,
    category: "Nike",
    tag: "HOT DROP",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    description: "Distressed soft suede upper featuring speckled mint eyelets and signature mesh underlays.",
    sizes: ["US W6", "US W6.5", "US W7", "US W7.5", "US W8", "US W8.5", "US W9"],
    materials: "Hairy suede upper, polyurethane midsole, visible Air-Sole heel unit",
    colorway: "Canyon Jade / Anthracite / Mint Foam",
    sku: "NK-AJ4-CNJ",
    accentColor: "from-teal-600 to-emerald-500",
    gender: "women"
  },
  {
    id: "snk-10",
    brand: "ADIDAS",
    name: "Gazelle Bold 'Triple Platform Pink'",
    price: 125,
    category: "Adidas",
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    description: "Triple-stacked platform gum rubber sole reimagining the 1968 terrace icon with lush pastel suede.",
    sizes: ["US W5.5", "US W6", "US W6.5", "US W7", "US W8", "US W8.5"],
    materials: "Premium pigskin suede, triple-layer rubber platform, synthetic lining",
    colorway: "True Pink / Cloud White / Gold Metallic",
    sku: "ADI-GZB-TPP",
    accentColor: "from-pink-600 to-rose-400",
    gender: "women"
  },
  // --- VAULT PRO GRAILS (High-Heat Collector Allocations) ---
  {
    id: "snk-v1",
    brand: "NIKE",
    name: "Off-White x Air Jordan 1 'Chicago Grail'",
    price: 1850,
    originalPrice: 2200,
    category: "Collaborations",
    tag: "VAULT GRAIL",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    description: "Virgil Abloh deconstructed masterpiece. Pinned Swoosh, zip-tie hardware, and exposed foam tongue.",
    sizes: ["US 9", "US 9.5", "US 10", "US 10.5", "US 11"],
    materials: "Deconstructed calf leather, mesh collar, signature Helvetica text print",
    colorway: "White / Black / Varsity Red",
    sku: "VAULT-OW-AJ1C",
    accentColor: "from-red-600 to-orange-600",
    gender: "unisex",
    vaultDrop: true,
    raffleEndsIn: "04h : 22m : 15s",
    allocationLeft: 3
  },
  {
    id: "snk-v2",
    brand: "NIKE",
    name: "Travis Scott x AJ1 Low OG 'Reverse Mocha'",
    price: 1280,
    category: "Collaborations",
    tag: "VAULT GRAIL",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    description: "Inverted oversized Swoosh on mocha durabuck with Cactus Jack embroidery and aged sail midsole.",
    sizes: ["US 8.5", "US 9", "US 10", "US 10.5"],
    materials: "Mocha durabuck suede, tumble sail leather, embroidered heel branding",
    colorway: "Sail / University Red / Ridgerock",
    sku: "VAULT-TS-RVM",
    accentColor: "from-amber-700 to-stone-800",
    gender: "unisex",
    vaultDrop: true,
    raffleEndsIn: "08h : 45m : 00s",
    allocationLeft: 2
  },
  {
    id: "snk-v3",
    brand: "NIKE",
    name: "Nike SB Dunk Low 'Chunky Dunky'",
    price: 1420,
    category: "Collaborations",
    tag: "VAULT GRAIL",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
    description: "Ben & Jerry ice cream tribute with faux cow-hair overlays, melting swoosh, and tie-dye collar.",
    sizes: ["US 9.5", "US 10", "US 11"],
    materials: "Faux pony hair, quilted tie-dye lining, melting polyurethane swoosh",
    colorway: "White / Lagoon Pulse / Monarch",
    sku: "VAULT-SB-CHDY",
    accentColor: "from-sky-500 to-yellow-500",
    gender: "unisex",
    vaultDrop: true,
    raffleEndsIn: "11h : 18m : 40s",
    allocationLeft: 1
  }
];
