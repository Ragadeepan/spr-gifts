import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "../utils/formatPrice";

const showcaseProducts = products.filter(p => p.featured).slice(0, 3);

const productHighlights = {
  "jhumka-12-pair": ["12 Pairs", "Opening Offer", "Premium Box"],
  "jhumka-16-pair": ["16 Pairs", "Opening Offer", "Premium Box"],
  "handmade-rose-bouquet": ["Handmade", "Rose Bouquet", "Price on Request"],
};

export function GiftShowcase() {
  const trackRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchCurrent, setTouchCurrent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoSlidePaused, setAutoSlidePaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [desktopAutoplay, setDesktopAutoplay] = useState(false);

  const productCount = showcaseProducts.length;
  const paused = autoSlidePaused || hoverPaused || reducedMotion || !desktopAutoplay;

  const goToSlide = useCallback((index) => {
    if (!productCount) return;
    setCurrentIndex((productCount + index) % productCount);
  }, [productCount]);

  const goPrev = useCallback(() => {
    setAutoSlidePaused(true);
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goNext = useCallback(() => {
    setAutoSlidePaused(true);
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const resumeAutoplaySoon = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setAutoSlidePaused(false), 2200);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    window.clearTimeout(resumeTimerRef.current);
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
      resumeAutoplaySoon();
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
    resumeAutoplaySoon();
  }, [isDragging, touchStart, touchCurrent, goNext, goPrev, resumeAutoplaySoon]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateAutoplayMode = () => setDesktopAutoplay(window.innerWidth >= 768);

    updateMotion();
    updateAutoplayMode();
    media.addEventListener("change", updateMotion);
    window.addEventListener("resize", updateAutoplayMode);

    return () => {
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("resize", updateAutoplayMode);
    };
  }, []);

  useEffect(() => {
    if (productCount <= 1 || paused) return undefined;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % productCount);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [paused, productCount]);

  useEffect(() => {
    return () => {
      window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(productCount - 1, 0)));
  }, [productCount]);

  if (!productCount) return null;

  const activeProduct = showcaseProducts[currentIndex];
  const translateX = isDragging && touchStart !== null && touchCurrent !== null
    ? -currentIndex * 100 + (touchCurrent - touchStart) / (trackRef.current?.offsetWidth || 1) * 100
    : -currentIndex * 100;

  const progress = ((currentIndex + 1) / productCount) * 100;

  return (
    <section className="gift-showcase" aria-label="Gift Showcase">
      <div className="showcase-container">
        <div 
          className="showcase-track-wrapper"
          ref={trackRef}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goPrev();
              resumeAutoplaySoon();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goNext();
              resumeAutoplaySoon();
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => {
            setHoverPaused(false);
            resumeAutoplaySoon();
          }}
        >
          <div 
            className="showcase-track"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isDragging ? "none" : "transform 700ms cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          >
            {showcaseProducts.map((product, idx) => (
              <div key={product.id} className="showcase-slide" aria-hidden={idx !== currentIndex}>
                <article className="showcase-card" style={{ animationDelay: `${idx * 150}ms` }}>
                  <Link to={`/product/${product.slug}`} className="showcase-image-link" aria-label={`View ${product.name}`}>
                    <div className="showcase-image-wrapper">
                      <img
                        src={product.images?.[0] || siteConfig.productPlaceholder}
                        alt={`${product.name} product photo from ${siteConfig.brandName}`}
                        loading={idx === 0 ? "eager" : "lazy"}
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        decoding="async"
                        width="600"
                        height="750"
                        className="showcase-image"
                        onError={(event) => {
                          event.currentTarget.src = siteConfig.productPlaceholder;
                        }}
                      />
                      <div className="showcase-badge-group">
                        {product.badge && <span className="showcase-badge">{product.badge}</span>}
                        <span className="showcase-tag">Tap to View</span>
                      </div>
                    </div>
                    <div className="showcase-overlay">
                      <span className="showcase-overlay-text">Explore Details</span>
                      <ChevronRight size={20} />
                    </div>
                  </Link>
                  <div className="showcase-content">
                    <div className="showcase-highlights">
                      {productHighlights[product.id]?.map((highlight, i) => (
                        <span key={i} className="highlight-chip">{highlight}</span>
                      ))}
                    </div>
                    <h2 className="showcase-title">{product.name}</h2>
                    <p className="showcase-desc">{product.shortDescription}</p>
                    <div className="showcase-price" aria-label={`Price for ${product.name}`}>
                      {product.price !== null && product.price !== undefined ? (
                        <>
                          <strong>{formatPrice(product.price)}</strong>
                          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
                        </>
                      ) : (
                        <strong>{product.priceLabel || formatPrice(product.price)}</strong>
                      )}
                    </div>
                    <Link to={`/product/${product.slug}`} className="showcase-cta gold-button">
                      View Product <ChevronRight size={16} />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="showcase-progress" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={productCount}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-dots">
            {showcaseProducts.map((_, idx) => (
              <span key={idx} className={idx === currentIndex ? "active" : ""} />
            ))}
          </div>
        </div>

        <div className="showcase-dots" role="tablist" aria-label="Product showcase navigation">
          {showcaseProducts.map((_, idx) => (
            <button
              key={idx}
              className={idx === currentIndex ? "active" : ""}
              onClick={() => {
                setAutoSlidePaused(true);
                goToSlide(idx);
                resumeAutoplaySoon();
              }}
              aria-label={`Show ${showcaseProducts[idx].name}`}
              aria-selected={idx === currentIndex}
              role="tab"
            />
          ))}
        </div>

        {showcaseProducts.length > 1 && (
          <>
            <button className="showcase-nav prev" onClick={() => { goPrev(); resumeAutoplaySoon(); }} aria-label={`Previous product, currently showing ${activeProduct.name}`} disabled={isDragging}>
              <ChevronLeft size={24} />
            </button>
            <button className="showcase-nav next" onClick={() => { goNext(); resumeAutoplaySoon(); }} aria-label={`Next product, currently showing ${activeProduct.name}`} disabled={isDragging}>
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
