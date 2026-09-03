import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export function CategoryCard({ category, compact = false }) {
  return (
    <Link to={`/shop?category=${category.slug}`} style={{ display: "block" }} aria-label={`Browse ${category.name}`}>
      <article className="category-card reveal">
        <img
          src={category.image || siteConfig.categoryPlaceholder}
          alt={`${category.name} — ${siteConfig.brandName}`}
          loading="lazy"
          decoding="async"
          width="560"
          height="420"
          onError={(event) => {
            event.currentTarget.src = siteConfig.categoryPlaceholder;
          }}
        />
        <div>
          <h3>{category.name}</h3>
          {!compact && <p>{category.description}</p>}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, color: "var(--gold)", fontWeight: 600, fontSize: "0.9rem" }}>
            Explore <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}