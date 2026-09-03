import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export function CategorySlider({ categories, title = "Curated Categories" }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 280;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="category-slider-wrap" style={{ position: "relative" }}>
      <div className="category-slider" ref={trackRef} aria-label={title}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} compact />
        ))}
      </div>
      <div className="slider-nav" style={{ display: "none" }}>
        <button type="button" aria-label="Previous" onClick={() => scroll(-1)}><ChevronLeft size={18} /></button>
        <button type="button" aria-label="Next" onClick={() => scroll(1)}><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}