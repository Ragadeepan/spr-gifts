import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export function CategoryCard({ category }) {
  return (
    <article className="category-card">
      <img
        src={category.image || siteConfig.categoryPlaceholder}
        alt={`${category.name} category`}
        loading="lazy"
        width="560"
        height="420"
        onError={(event) => {
          event.currentTarget.src = siteConfig.categoryPlaceholder;
        }}
      />
      <div>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <Link to={`/shop?category=${category.slug}`}>
          Explore <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
