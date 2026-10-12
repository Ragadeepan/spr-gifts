import { CategoryCard } from "./CategoryCard";

export function CategorySlider({ categories, title = "Featured Categories" }) {
  return (
    <section className="category-slider-section" aria-label={title}>
      <div className="section-header">
        <div className="section-header-left">
          <p className="eyebrow">Curated Collections</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="premium-category-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} expanded />
        ))}
      </div>
    </section>
  );
}
