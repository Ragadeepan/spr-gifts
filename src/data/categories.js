export const categories = [
  {
    id: "jhumki-gift-sets",
    slug: "jhumki-gift-sets",
    name: "Jhumki Gift Sets",
    image: "/images/categories/earrings-gift-box.webp",
    description: "Premium jhumki earring gift sets — 12-pair and 16-pair collections.",
  },
  {
    id: "flower-bouquets",
    slug: "flower-bouquets",
    name: "Flower Bouquets",
    image: "/images/categories/flower-bouquets.webp",
    description: "Beautiful decorative flower bouquets for every special occasion.",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug);

export const getCategoryById = (id) =>
  categories.find((category) => category.id === id);