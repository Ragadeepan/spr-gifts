import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { products } from "../data/products";

function getCategoryImage(categoryId) {
  const product = products.find(p => p.category === categoryId);
  return product?.images?.[0] || siteConfig.categoryPlaceholder;
}

function getCategoryDescription(categoryId) {
  const descriptions = {
    "jhumki-gift-sets": "Premium jhumki earring gift sets — 12-pair and 16-pair collections.",
    "flower-bouquets": "Beautiful decorative flower bouquets for every special occasion.",
  };
  return descriptions[categoryId] || "";
}

export function CategoryCard({ category }) {
  const image = getCategoryImage(category.id);
  const description = getCategoryDescription(category.id);

  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card-link" aria-label={`Browse ${category.name}`}>
      <article className="category-card">
        <div className="category-image-wrapper">
          <img
            src={image}
            alt={`${category.name} — SPR GIFTS.IN`}
            loading="lazy"
            decoding="async"
            width="560"
            height="420"
            className="category-image"
            onError={(e) => { e.currentTarget.src = siteConfig.categoryPlaceholder; }}
          />
        </div>
        <div className="category-content">
          <h3 className="category-name">{category.name}</h3>
          <p className="category-desc">{description}</p>
          <span className="category-cta">
            Explore <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}