export const categories = [
  {
    id: "customized-gifts",
    slug: "customized-gifts",
    name: "Customized Gifts",
    image: "/images/categories/customized-gifts.svg",
    description: "Personalized keepsakes and curated surprises built around your idea.",
  },
  {
    id: "earrings-gift-box",
    slug: "earrings-gift-box",
    name: "Earrings Gift Box",
    image: "/images/categories/earrings-gift-box.svg",
    description: "Elegant jewellery gifting boxes for birthdays and special occasions.",
  },
  {
    id: "16-piece-gift-box",
    slug: "16-piece-gift-box",
    name: "16-Piece Gift Box",
    image: "/images/categories/16-piece-gift-box.svg",
    description: "Premium gift boxes with a richer, ready-to-surprise presentation.",
  },
  {
    id: "flower-bouquets",
    slug: "flower-bouquets",
    name: "Flower Bouquets",
    image: "/images/categories/flower-bouquets.svg",
    description: "Beautiful bouquet arrangements for warm and memorable moments.",
  },
  {
    id: "customized-bouquets",
    slug: "customized-bouquets",
    name: "Customized Bouquets",
    image: "/images/categories/customized-bouquets.svg",
    description: "Bouquets designed around your preferred colors, theme and message.",
  },
  {
    id: "chocolate-bouquets",
    slug: "chocolate-bouquets",
    name: "Chocolate Bouquets",
    image: "/images/categories/chocolate-bouquets.svg",
    description: "Sweet bouquet-style chocolate gifts with a premium finish.",
  },
  {
    id: "new-arrivals",
    slug: "new-arrivals",
    name: "New Arrivals",
    image: "/images/categories/new-arrivals.svg",
    description: "Freshly added gift ideas and new presentation styles.",
  },
  {
    id: "best-sellers",
    slug: "best-sellers",
    name: "Best Sellers",
    image: "/images/categories/best-sellers.svg",
    description: "Popular gift styles customers often ask for through WhatsApp.",
  },
  {
    id: "coming-soon",
    slug: "coming-soon",
    name: "Coming Soon",
    image: "/images/categories/coming-soon.svg",
    description: "Upcoming SPR gifting concepts that can be announced later.",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug);

export const getCategoryById = (id) =>
  categories.find((category) => category.id === id);