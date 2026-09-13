import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";

const showcaseProducts = products.filter(p => p.featured).slice(0, 3);

const productDescriptions = {
  "12-pair-jhumki-gift-set": "Elegant collection of 12 beautiful jhumki earrings.",
  "16-pair-jhumki-gift-set": "Premium collection of 16 beautiful jhumki earrings.",
  "flower-bouquet": "Beautiful flower bouquet for special moments.",
};

export function GiftShowcase() {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchCurrent, setTouchCurrent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoSlidePaused, setAutoSlidePaused] = useState(false);
  const autoSlideRef = useRef(null);

  const productCount = showcaseProducts.length;

  const goToSlide = useCallback((index) => {
    setCurrentIndex((productCount + index) % productCount);
  }, [productCount]);

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
    const threshold = 50;
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
        if (!autoSlidePaused) goNext();
      }, 5000);
    }
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [autoSlidePaused, goNext]);

  const activeProduct = showcaseProducts[currentIndex];
  const translateX = isDragging && touchStart !== null && touchCurrent !== null
    ? -currentIndex * 100 + (touchCurrent - touchStart) / (trackRef.current?.offsetWidth || 1) * 100
    : -currentIndex * 100;

  return (
    <section className="gift-showcase" aria-label="Gift Showcase">
      <div className="showcase-container">
        <div 
          className="showcase-track-wrapper"
          ref={trackRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div 
            className="showcase-track"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isDragging ? "none" : "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}
          >
            {showcaseProducts.map((product, idx) => (
              <div key={product.id} className="showcase-slide" style={{ width: `${100 / productCount}%` }}>
                <article className="showcase-card">
                  <Link to={`/product/${product.slug}`} className="showcase-image-link" aria-label={`View ${product.name}`}>
                    <div className="showcase-image-wrapper">
                      <img
                        src={product.images?.[0]}
                        alt={`${product.name} from SPR GIFTS.IN`}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                        width="600"
                        height="750"
                        className="showcase-image"
                      />
                    </div>
                  </Link>
                  <div className="showcase-content">
                    <h2 className="showcase-title">{product.name}</h2>
                    <p className="showcase-desc">{productDescriptions[product.slug] || product.shortDescription}</p>
                    <Link to={`/product/${product.slug}`} className="showcase-cta gold-button">
                      View Product
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="showcase-dots" role="tablist" aria-label="Product showcase navigation">
          {showcaseProducts.map((_, idx) => (
            <button
              key={idx}
              className={idx === currentIndex ? "active" : ""}
              onClick={() => goToSlide(idx)}
              aria-label={`Show ${showcaseProducts[idx].name}`}
              aria-selected={idx === currentIndex}
              role="tab"
            />
          ))}
        </div>

        {showcaseProducts.length > 1 && (
          <>
            <button className="showcase-nav prev" onClick={goPrev} aria-label="Previous product" disabled={isDragging}>
              <ChevronLeft size={24} />
            </button>
            <button className="showcase-nav next" onClick={goNext} aria-label="Next product" disabled={isDragging}>
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}