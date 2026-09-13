import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

export function ProductSlider({ products, title = "Featured Products" }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex(i => Math.min(maxIndex, i + 1));

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
    }
    setTouchStart(null);
  };

  if (!products.length) return null;

  return (
    <section className="section" style={{ position: "relative" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <p className="eyebrow" style={{ margin: "0 0 8px", color: "var(--gold)", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>Available Now</p>
          <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)", color: "var(--ivory)" }}>{title}</h2>
        </div>
      </div>

      <div className="slider-container" style={{ position: "relative" }}>
        <div className="slider-track" ref={trackRef} style={{ display: "flex", gap: 18, transition: "transform 400ms cubic-bezier(.2,.7,.2,1)", touchAction: "pan-y", onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }}>
          {products.map((product, idx) => (
            <div key={product.id} style={{ flex: `0 0 calc((100% - ${18 * (visibleCount - 1)}px) / ${visibleCount})`, minWidth: 0 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length > visibleCount && (
          <>
            <button className="slider-btn prev" onClick={goPrev} disabled={currentIndex === 0} aria-label="Previous" style={{ position: "absolute", top: "50%", left: -12, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--line)", background: "rgba(20,14,9,0.9)", color: "var(--ivory)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10, opacity: currentIndex === 0 ? 0.4 : 1, transition: "opacity 200ms" }}><ChevronLeft size={20} /></button>
            <button className="slider-btn next" onClick={goNext} disabled={currentIndex === maxIndex} aria-label="Next" style={{ position: "absolute", top: "50%", right: -12, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--line)", background: "rgba(20,14,9,0.9)", color: "var(--ivory)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10, opacity: currentIndex === maxIndex ? 0.4 : 1, transition: "opacity 200ms" }}><ChevronRight size={20} /></button>
          </>
        )}

        <div className="slider-dots" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={idx === currentIndex ? "active" : ""} aria-label={`Go to slide ${idx + 1}`} style={{ width: 8, height: 8, borderRadius: "50%", border: 0, background: idx === currentIndex ? "var(--gold-light)" : "rgba(212,175,99,0.3)", cursor: "pointer", transition: "all 200ms", transform: idx === currentIndex ? "scale(1.3)" : "none" }} />
          ))}
        </div>
      </div>
    </section>
  );
}