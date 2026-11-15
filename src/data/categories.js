export const categories = [
  {
    id: "jhumka-gift-sets",
    slug: "jhumka-gift-sets",
    legacySlugs: ["jhumki-gift-sets"],
    name: "Jhumki Gift Sets",
    image: "/images/products/jhumki-16-pair.webp",
    description: "Premium Jhumki earring gift sets in 12-pair and 16-pair collections.",
  },
  {
    id: "handmade-flower-bouquets",
    slug: "handmade-flower-bouquets",
    legacySlugs: ["flower-bouquets"],
    name: "Handmade Flower Bouquets",
    image: "/images/products/flower-bouquet.webp",
    description: "Handmade rose bouquets prepared for birthdays, anniversaries and special moments.",
  },
  {
    id: "chocolate-bouquets",
    slug: "chocolate-bouquets",
    name: "Chocolate Bouquets",
    image: "/images/products/chocolate-bouquet-01.jpeg",
    description: "Handmade chocolate bouquets for birthdays, anniversaries and special moments.",
  },
  {
    id: "chocolate-packets",
    slug: "chocolate-packets",
    name: "Chocolate Packets",
    image: "/images/products/chocolate-bouquet-01.jpeg",
    description: "Custom chocolate gift packets prepared around your preferred budget and requirements.",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug || category.legacySlugs?.includes(slug));

export const getCategoryById = (id) =>
  categories.find((category) => category.id === id);
