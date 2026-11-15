export const products = [
  {
    id: "jhumka-12-pair",
    slug: "12-pair-jhumka-gift-set",
    legacySlugs: ["12-pair-jhumki-gift-set"],
    name: "12-Pair Jhumka Gift Set",
    category: "jhumka-gift-sets",
    price: 799,
    oldPrice: 949,
    currency: "INR",
    shortDescription: "12 pairs of stylish Jhumka earrings arranged in a premium gift box.",
    description:
      "A beautiful collection of 12 pairs of stylish Jhumka earrings packed in a premium gift box. Perfect for birthdays, anniversaries, festivals and special moments.",
    images: ["/images/products/jhumki-12-pair.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "Opening Offer",
    sortOrder: 1,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["jhumka", "earrings", "gift set", "12 pair", "opening offer"],
  },
  {
    id: "jhumka-16-pair",
    slug: "16-pair-jhumka-gift-set",
    legacySlugs: ["16-pair-jhumki-gift-set"],
    name: "16-Pair Jhumka Gift Set",
    category: "jhumka-gift-sets",
    price: 999,
    oldPrice: 1199,
    currency: "INR",
    shortDescription: "16 pairs of stylish Jhumka earrings arranged in an elegant gift box.",
    description:
      "A premium collection of 16 pairs of stylish Jhumka earrings packed in an elegant gift box. Perfect for gifting, birthdays, anniversaries, festivals and special occasions.",
    images: ["/images/products/jhumki-16-pair.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "Opening Offer",
    sortOrder: 2,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["jhumka", "earrings", "gift set", "16 pair", "opening offer"],
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
    shortDescription: "A handmade rose bouquet for birthdays, anniversaries and thoughtful surprises.",
    description:
      "A handmade rose bouquet prepared for birthdays, anniversaries, surprises and special moments. Message us on WhatsApp for the current design options, rose count and confirmed price.",
    images: ["/images/products/flower-bouquet.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "",
    sortOrder: 3,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["handmade", "rose bouquet", "flowers", "birthday", "anniversary", "gift"],
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
