import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

export function ProductSlider({ products, title = "Featured Products" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchCurrent, setTouchCurrent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  const count = products.length;

  const goToSlide = useCallback((index) => {
    if (!count) return;
    setCurrentIndex((count + index) % count);
  }, [count]);

  const resumeSoon = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setPaused(false), 2200);
  }, []);

  const goPrev = useCallback(() => {
    setPaused(true);
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goNext = useCallback(() => {
    setPaused(true);
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (count <= 1 || paused) return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || window.innerWidth < 768) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % count);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [count, paused]);

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  if (!count) return null;

  const translateX = isDragging && touchStart !== null && touchCurrent !== null
    ? -currentIndex * 100 + ((touchCurrent - touchStart) / window.innerWidth) * 100
    : -currentIndex * 100;

  return (
    <section className="section product-slider-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Available Now</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="single-product-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); resumeSoon(); }}>
        <div
          className="single-product-slider-track"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isDragging ? "none" : "transform 520ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onTouchStart={(event) => {
            if (event.touches.length !== 1) return;
            window.clearTimeout(resumeTimerRef.current);
            setPaused(true);
            setTouchStart(event.touches[0].clientX);
            setTouchCurrent(event.touches[0].clientX);
            setIsDragging(true);
          }}
          onTouchMove={(event) => {
            if (!isDragging || event.touches.length !== 1) return;
            setTouchCurrent(event.touches[0].clientX);
          }}
          onTouchEnd={() => {
            if (touchStart !== null && touchCurrent !== null) {
              const diff = touchStart - touchCurrent;
              if (Math.abs(diff) > 44) {
                if (diff > 0) goNext();
                else goPrev();
              }
            }
            setIsDragging(false);
            setTouchStart(null);
            setTouchCurrent(null);
            resumeSoon();
          }}
        >
          {products.map((product) => (
            <div className="single-product-slide" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button className="slider-btn prev" onClick={() => { goPrev(); resumeSoon(); }} aria-label="Previous product">
              <ChevronLeft size={20} />
            </button>
            <button className="slider-btn next" onClick={() => { goNext(); resumeSoon(); }} aria-label="Next product">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="slider-dots" role="tablist" aria-label="Product navigation">
        {products.map((product, index) => (
          <button
            key={product.id}
            className={index === currentIndex ? "active" : ""}
            onClick={() => {
              setPaused(true);
              goToSlide(index);
              resumeSoon();
            }}
            aria-label={`Show ${product.name}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
