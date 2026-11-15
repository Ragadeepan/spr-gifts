export const products = [
  {
    id: "jhumka-12-pair",
    slug: "12-pair-jhumka-gift-set",
    legacySlugs: ["12-pair-jhumki-gift-set"],
    name: "12 Pairs Jhumki Gift Set",
    code: "SPR-JMK-12",
    category: "jhumka-gift-sets",
    price: 799,
    oldPrice: 949,
    currency: "INR",
    shortDescription: "12 pairs of stylish Jhumki earrings arranged in a premium gift box.",
    description:
      "A beautiful collection of 12 pairs of stylish Jhumki earrings packed in a premium gift box. Perfect for birthdays, anniversaries, festivals and special moments.",
    images: ["/images/products/jhumki-12-pair.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "Opening Offer",
    sortOrder: 1,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["jhumka", "jhumki", "earrings", "gift set", "12 pair", "opening offer"],
  },
  {
    id: "jhumka-16-pair",
    slug: "16-pair-jhumka-gift-set",
    legacySlugs: ["16-pair-jhumki-gift-set"],
    name: "16 Pairs Jhumki Gift Set",
    code: "SPR-JMK-16",
    category: "jhumka-gift-sets",
    price: 999,
    oldPrice: 1199,
    currency: "INR",
    shortDescription: "16 pairs of stylish Jhumki earrings arranged in an elegant gift box.",
    description:
      "A premium collection of 16 pairs of stylish Jhumki earrings packed in an elegant gift box. Perfect for gifting, birthdays, anniversaries, festivals and special occasions.",
    images: ["/images/products/jhumki-16-pair.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "Opening Offer",
    sortOrder: 2,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["jhumka", "jhumki", "earrings", "gift set", "16 pair", "opening offer"],
  },
  {
    id: "handmade-rose-bouquet",
    slug: "handmade-rose-bouquet",
    legacySlugs: ["flower-bouquet"],
    name: "Handmade Rose Bouquet",
    category: "handmade-flower-bouquets",
    price: null,
    oldPrice: null,
    currency: "INR",
    priceLabel: "Price on request",
    shortDescription: "Beautiful handmade rose bouquets, carefully prepared with love and available to customize.",
    description:
      "Beautiful handmade rose bouquets, carefully prepared with love. Custom bouquet sizes and designs are available according to your preferred budget and requirements. Contact us for customization and pricing.",
    images: ["/images/products/flower-bouquet.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "",
    sortOrder: 3,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["handmade", "rose bouquet", "flowers", "birthday", "anniversary", "gift"],
    customizationFields: ["Rose count", "Bouquet size", "Wrapping style", "Custom budget", "Special message"],
  },
  {
    id: "chocolate-bouquet",
    slug: "chocolate-bouquet",
    name: "Chocolate Bouquet",
    category: "chocolate-bouquets",
    price: null,
    oldPrice: null,
    currency: "INR",
    priceLabel: "Price on request",
    shortDescription: "A beautiful chocolate bouquet for birthdays, anniversaries and special moments.",
    description:
      "Make every celebration sweeter with our beautiful Chocolate Bouquet! A lovely combination of chocolates arranged in an attractive bouquet style, making it a perfect gift for birthdays, anniversaries, surprises, and special moments.\n\nSurprise your loved ones with a delicious and thoughtful gift from SPR GIFTS.IN.",
    brand: "SPR GIFTS.IN",
    tagline: "Gifts Made Special",
    highlights: [
      "Attractive handmade bouquet presentation",
      "Filled with delicious chocolates",
      "Perfect for birthdays, anniversaries, and special occasions",
      "A sweet surprise for your loved ones",
      "A thoughtful gifting choice",
    ],
    images: [
      "/images/products/chocolate-bouquet-01.jpeg",
      "/images/products/chocolate-bouquet-02.jpeg",
    ],
    video: null,
    featured: true,
    available: true,
    badge: "",
    sortOrder: 4,
    createdAt: "2026-11-15",
    updatedAt: "2026-11-15",
    tags: ["chocolate bouquet", "handmade", "birthday", "anniversary", "special occasions", "gift"],
  },
  {
    id: "chocolate-packet",
    slug: "chocolate-packet",
    name: "Chocolate Packet",
    category: "chocolate-packets",
    price: null,
    oldPrice: null,
    currency: "INR",
    priceLabel: "Custom Order – Contact for Price",
    shortDescription: "Custom chocolate gift packets arranged around your preferred budget.",
    description:
      "Beautifully presented chocolate gift packets. Custom packet sizes and gift arrangements can be prepared according to your preferred budget and requirements. Contact us to discuss your choice and pricing.",
    images: ["/images/products/chocolate-bouquet-01.jpeg"],
    video: null,
    featured: true,
    available: true,
    availabilityLabel: "Custom order enquiry",
    badge: "Custom Order",
    sortOrder: 5,
    createdAt: "2026-11-15",
    updatedAt: "2026-11-15",
    customizationFields: ["Packet size", "Quantity", "Preferred budget", "Customization details"],
    tags: ["chocolate packet", "custom gift", "custom budget", "gift packet"],
  },
];

export const roseBouquetPrices = [
  { roses: 1, price: 80 },
  { roses: 2, price: 150 },
  { roses: 3, price: 220 },
  { roses: 4, price: 300 },
  { roses: 5, price: null, priceLabel: "Contact for confirmed price" },
  { roses: 6, price: 450 },
  { roses: 7, price: 530 },
  { roses: 8, price: 600 },
  { roses: 9, price: 670 },
  { roses: 10, price: 740 },
];

export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug || product.legacySlugs?.includes(slug));

export const getProductsByCategory = (categoryId) =>
  products.filter((product) => product.category === categoryId);

export const getFeaturedProducts = () =>
  products.filter((product) => product.featured);

export const getNewArrivals = () =>
  products.filter((product) => product.badge === "New");

export const getBestSellers = () =>
  products.filter((product) => product.badge === "Best Seller");
