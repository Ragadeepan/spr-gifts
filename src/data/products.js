export const products = [
  {
    id: "jhumki-12-pair",
    slug: "12-pair-jhumki-gift-set",
    name: "12-Pair Jhumki Gift Set",
    category: "jhumki-gift-sets",
    price: 799,
    oldPrice: 949,
    currency: "INR",
    shortDescription: "12 pairs of stylish jhumki earrings in a premium gift box. Opening Offer: ₹799 (Regular ₹949).",
    description:
      "Beautiful collection of 12 pairs of stylish jhumki earrings packed in a premium gift box. Perfect for birthdays, anniversaries, festivals and special moments.",
    images: ["/images/products/rose-gold-earrings-gift-box.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "Opening Offer",
    sortOrder: 1,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["jhumki", "earrings", "gift set", "12 pair", "opening offer"],
  },
  {
    id: "jhumki-16-pair",
    slug: "16-pair-jhumki-gift-set",
    name: "16-Pair Jhumki Gift Set",
    category: "jhumki-gift-sets",
    price: 999,
    oldPrice: 1199,
    currency: "INR",
    shortDescription: "16 pairs of stylish jhumki earrings in an elegant gift box. Opening Offer: ₹999 (Regular ₹1,199).",
    description:
      "Premium collection of 16 pairs of stylish jhumki earrings packed in an elegant gift box. Perfect for gifting, birthdays, anniversaries, festivals and special occasions.",
    images: ["/images/products/premium-16-piece-gift-box.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "Opening Offer",
    sortOrder: 2,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["jhumki", "earrings", "gift set", "16 pair", "opening offer"],
  },
  {
    id: "flower-bouquet",
    slug: "flower-bouquet",
    name: "Flower Bouquet",
    category: "flower-bouquets",
    price: null,
    oldPrice: null,
    currency: "INR",
    shortDescription: "Beautiful decorative flower bouquet for birthdays, anniversaries and special occasions. DM for Price.",
    description:
      "Beautiful decorative flower bouquet made for birthdays, anniversaries, surprises and special moments. Contact us for current designs and pricing.",
    images: ["/images/products/pink-rose-bouquet.webp"],
    video: null,
    featured: true,
    available: true,
    badge: "",
    sortOrder: 3,
    createdAt: "2026-09-13",
    updatedAt: "2026-09-13",
    tags: ["flower", "bouquet", "birthday", "anniversary", "gift"],
  },
];

export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug);

export const getProductsByCategory = (categoryId) =>
  products.filter((product) => product.category === categoryId);

export const getFeaturedProducts = () =>
  products.filter((product) => product.featured);

export const getNewArrivals = () =>
  products.filter((product) => product.badge === "New");

export const getBestSellers = () =>
  products.filter((product) => product.badge === "Best Seller");