import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, PackageCheck, Truck } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

function getCategoryFeatures(categoryId) {
  const features = {
    "jhumka-gift-sets": [
      { icon: PackageCheck, text: "12 & 16 Pair Sets" },
      { icon: MessageCircle, text: "WhatsApp Order" },
      { icon: Truck, text: "Charge Confirmed" },
    ],
    "handmade-flower-bouquets": [
      { icon: PackageCheck, text: "Handmade Roses" },
      { icon: MessageCircle, text: "Price on Request" },
      { icon: Truck, text: "Charge Confirmed" },
    ],
  };
  return features[categoryId] || [];
}

export function CategoryCard({ category, expanded = false, compact = false }) {
  const image = category.image || siteConfig.categoryPlaceholder;
  const description = category.description || "";
  const features = getCategoryFeatures(category.id);

  return (
    <Link to={`/shop?category=${category.slug}`} className={`category-card-link ${expanded ? "expanded" : ""} ${compact ? "compact" : ""}`} aria-label={`Browse ${category.name}`}>
      <article className="category-card">
        <div className="category-image-wrapper">
          <img
            src={image}
            alt={`${category.name} — SPR GIFTS.IN`}
            loading={expanded ? "eager" : "lazy"}
            decoding="async"
            width="560"
            height={expanded ? 480 : 420}
            className="category-image"
            onError={(e) => { e.currentTarget.src = siteConfig.categoryPlaceholder; }}
          />
          <div className="category-image-overlay">
            <span className="overlay-text">Explore Collection</span>
            <ArrowRight size={18} />
          </div>
        </div>
        <div className="category-content">
          <h3 className="category-name">{category.name}</h3>
          {!compact && !expanded && <p className="category-desc">{description}</p>}
          {!compact && !expanded && (
            <div className="category-features">
              {features.map(({ icon: Icon, text }, i) => (
                <span key={i} className="feature-chip">
                  <Icon size={12} /> {text}
                </span>
              ))}
            </div>
          )}
          {expanded && (
            <div className="expanded-content">
              <p className="category-desc">{description}</p>
              <div className="category-features">
                {features.map(({ icon: Icon, text }, i) => (
                  <span key={i} className="feature-chip">
                    <Icon size={12} /> {text}
                  </span>
                ))}
              </div>
            </div>
          )}
          <span className="category-cta">
            {expanded ? "Shop Now" : "Explore"} <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
