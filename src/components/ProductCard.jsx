import { ShoppingBag } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCategoryById } from "../data/categories";
import { siteConfig } from "../data/siteConfig";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const category = getCategoryById(product.category);
  const hasPrice = product.price !== null && product.price !== undefined;
  const images = product.images?.length ? product.images : [siteConfig.productPlaceholder];
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef(null);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % images.length), 4500);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const showImage = (index) => setActiveIndex((index + images.length) % images.length);

  return (
    <article className="product-card reveal">
      <div
        className="product-image"
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointerStart.current === null || images.length < 2) return;
          const distance = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(distance) > 42) showImage(activeIndex + (distance < 0 ? 1 : -1));
        }}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        <Link className="product-image-link" to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={images[activeIndex] || siteConfig.productPlaceholder}
            alt={`${product.name} from ${siteConfig.brandName}, image ${activeIndex + 1}`}
            loading="lazy"
            decoding="async"
            width="640"
            height="800"
            onError={(event) => {
              event.currentTarget.src = siteConfig.productPlaceholder;
            }}
          />
        </Link>
        {images.length > 1 && (
          <>
            <button className="product-gallery-arrow previous" type="button" aria-label={`Previous ${product.name} image`} onClick={() => showImage(activeIndex - 1)}>
              <ChevronLeft size={18} />
            </button>
            <button className="product-gallery-arrow next" type="button" aria-label={`Next ${product.name} image`} onClick={() => showImage(activeIndex + 1)}>
              <ChevronRight size={18} />
            </button>
            <div className="product-gallery-dots" role="tablist" aria-label={`${product.name} images`}>
              {images.map((image, index) => (
                <button key={image} type="button" className={index === activeIndex ? "active" : ""} onClick={() => showImage(index)} aria-label={`Show image ${index + 1}`} aria-selected={index === activeIndex} role="tab" />
              ))}
            </div>
          </>
        )}
        {!product.available && <span className="stock-badge">Out of stock</span>}
        {product.available && product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
      <div className="product-body">
        <p>{category?.name || product.category}</p>
        <h3>{product.name}</h3>
        <p style={{ fontSize: "0.9rem", margin: "4px 0", color: "var(--text-soft)" }}>{product.shortDescription}</p>
        <div className="price-row">
          <strong>{product.priceLabel || formatPrice(product.price)}</strong>
          {hasPrice && product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
        <span className={product.available ? "available" : "unavailable"}>
          {product.available ? "● Available" : "● Currently unavailable"}
        </span>
        <div className="card-actions">
          <Link to={`/product/${product.slug}`}>View Product</Link>
          {hasPrice ? (
            <button
              type="button"
              onClick={() => addToCart(product)}
              disabled={!product.available}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
          ) : (
            <Link to={`/product/${product.slug}`} className="order-link">Order on WhatsApp</Link>
          )}
        </div>
      </div>
    </article>
  );
}
