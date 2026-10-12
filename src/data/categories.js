export const categories = [
  {
    id: "jhumka-gift-sets",
    slug: "jhumka-gift-sets",
    legacySlugs: ["jhumki-gift-sets"],
    name: "Jhumka Gift Sets",
    image: "/images/products/jhumki-16-pair.webp",
    description: "Premium Jhumka earring gift sets in 12-pair and 16-pair collections.",
  },
  {
    id: "handmade-flower-bouquets",
    slug: "handmade-flower-bouquets",
    legacySlugs: ["flower-bouquets"],
    name: "Handmade Flower Bouquets",
    image: "/images/products/flower-bouquet.webp",
    description: "Handmade rose bouquets prepared for birthdays, anniversaries and special moments.",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug || category.legacySlugs?.includes(slug));

export const getCategoryById = (id) =>
  categories.find((category) => category.id === id);
