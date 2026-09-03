import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";

export function ProductSlider({ products, title = "Featured products" }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const el = trackRef.current;
    if (!el || !products.length) return;
    const nextIndex = (index + products.length) % products.length;
    const card = el.children[nextIndex];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  };

  const scroll = (direction) => {
    scrollToIndex(activeIndex + direction);
  };

  useEffect(() => {
    if (products.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      if (document.hidden || trackRef.current?.matches(":hover")) return;
      scrollToIndex(activeIndex + 1);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [activeIndex, products.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;

    const updateActive = () => {
      const children = [...el.children];
      const nextIndex = children.reduce(
        (closest, child, index) => {
          const distance = Math.abs(child.getBoundingClientRect().left - el.getBoundingClientRect().left);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index;
      setActiveIndex(nextIndex);
    };

    el.addEventListener("scroll", updateActive, { passive: true });
    return () => el.removeEventListener("scroll", updateActive);
  }, []);

  if (!products.length) {
    return null;
  }

  return (
    <div className="product-slider-wrap">
      {products.length > 1 && (
        <div className="slider-nav product-slider-nav">
          <button type="button" aria-label={`Previous ${title}`} onClick={() => scroll(-1)}>
            <ChevronLeft size={19} />
          </button>
          <button type="button" aria-label={`Next ${title}`} onClick={() => scroll(1)}>
            <ChevronRight size={19} />
          </button>
        </div>
      )}
      <div className="product-slider" ref={trackRef} aria-label={title}>
        {products.map((product) => (
          <div className="product-slide" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {products.length > 1 && (
        <div className="slider-dots" aria-label={`${title} pagination`}>
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => scrollToIndex(index)}
              aria-label={`Show ${product.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
