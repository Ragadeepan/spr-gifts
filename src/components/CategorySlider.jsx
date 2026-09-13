import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export function CategorySlider({ categories, title = "Featured Categories" }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchCurrent, setTouchCurrent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoSlidePaused, setAutoSlidePaused] = useState(false);
  const autoSlideRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 480) setVisibleCount(1);
      else if (width < 768) setVisibleCount(1.5);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(2.5);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const goToSlide = useCallback((index) => {
    const maxIndex = categories.length - 1;
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [categories.length]);

  const goPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);
  const goNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    setTouchStart(e.touches[0].clientX);
    setTouchCurrent(e.touches[0].clientX);
    setIsDragging(true);
    setAutoSlidePaused(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setTouchCurrent(e.touches[0].clientX);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || touchStart === null || touchCurrent === null) {
      setIsDragging(false);
      setTouchStart(null);
      setTouchCurrent(null);
      setAutoSlidePaused(false);
      return;
    }
    const diff = touchStart - touchCurrent;
    const threshold = 40;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goNext(); else goPrev();
    }
    setIsDragging(false);
    setTouchStart(null);
    setTouchCurrent(null);
    setAutoSlidePaused(false);
  }, [isDragging, touchStart, touchCurrent, goNext, goPrev]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      autoSlideRef.current = setInterval(() => {
        if (!autoSlidePaused) {
          goToSlide((currentIndex + 1) % categories.length);
        }
      }, 4000);
    }
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [autoSlidePaused, categories.length, currentIndex, goNext]);

  const slideWidth = 100 / Math.min(visibleCount, categories.length);

  const translateX = isDragging && touchStart !== null && touchCurrent !== null
    ? -currentIndex * slideWidth + (touchCurrent - touchStart) / (trackRef.current?.offsetWidth || 1) * 100
    : -currentIndex * slideWidth;

  return (
    <section className="category-slider-section" aria-label={title}>
      <div className="section-header">
        <p className="eyebrow">Curated Collections</p>
        <h2>{title}</h2>
      </div>

      <div 
        className="category-slider-wrapper"
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div 
          className="category-slider-track"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isDragging ? "none" : "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            width: `${categories.length * (100 / visibleCount)}%`
          }}
        >
          {categories.map((category) => (
            <div key={category.id} className="category-slide" style={{ width: slideWidth + "%" }}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      <div className="slider-dots" role="tablist" aria-label="Category navigation">
        {categories.map((_, idx) => (
          <button
            key={idx}
            className={idx === currentIndex ? "active" : ""}
            onClick={() => goToSlide(idx)}
            aria-label={`Show ${categories[idx].name}`}
            aria-selected={idx === currentIndex}
            role="tab"
          />
        ))}
      </div>

      {categories.length > visibleCount && (
        <>
          <button className="slider-nav prev" onClick={goPrev} aria-label="Previous category" disabled={isDragging}>
            <ChevronLeft size={20} />
          </button>
          <button className="slider-nav next" onClick={goNext} aria-label="Next category" disabled={isDragging}>
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </section>
  );
}