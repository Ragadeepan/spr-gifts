import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getCategoryById } from "../data/categories";
import { getProductBySlug } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "../utils/formatPrice";
import { addJsonLd, breadcrumbJsonLd, productJsonLd, setSeo } from "../utils/seo";
import { productWhatsAppUrl } from "../utils/whatsapp";

export function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartX = useRef(null);
  const { addToCart } = useCart();
  const category = product ? getCategoryById(product.category) : null;

  const productUrl = useMemo(() => {
    if (!product) return "";
    return `${window.location.origin}/product/${product.slug}`;
  }, [product]);

  useEffect(() => {
    if (!product) {
      setSeo({
        title: "Product Not Found | SPR GIFTS.IN",
        description: "This product could not be found in the SPR GIFTS.IN catalog.",
        path: `/product/${slug}`,
      });
      return;
    }

    setActiveIndex(0);
    setSeo({
      title: `${product.name} | ${siteConfig.brandName}`,
      description: product.shortDescription,
      image: product.images?.[0] || siteConfig.productPlaceholder,
      path: `/product/${product.slug}`,
      type: "product",
    });
    addJsonLd("product-jsonld", productJsonLd(product, category?.name || product.category));
    addJsonLd(
      "breadcrumb-jsonld",
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: product.name, path: `/product/${product.slug}` },
      ]),
    );
  }, [product, category, slug]);

  if (!product) {
    return (
      <section className="page section center-page">
        <p className="eyebrow">404</p>
        <h1>Product not found</h1>
        <p>This gift may have been moved or removed.</p>
        <Link className="gold-button" to="/shop">
          Back to Shop
        </Link>
      </section>
    );
  }

  const images = product.images?.length ? product.images : [siteConfig.productPlaceholder];
  const activeImage = images[activeIndex] || siteConfig.productPlaceholder;

  const handlePrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const handleNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const handlePointerDown = (event) => {
    if (images.length <= 1) return;
    swipeStartX.current = event.clientX;
  };
  const handlePointerUp = (event) => {
    if (images.length <= 1 || swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 42) return;
    if (distance > 0) handlePrev();
    else handleNext();
  };

  const hasPrice = product.price !== null && product.price !== undefined;

  return (
    <section className="page section product-detail">
      <div className="gallery">
        <div
          className="main-product-image-wrap"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            swipeStartX.current = null;
          }}
        >
          <img
            className="main-product-image"
            src={activeImage}
            alt={product.name}
            width="900"
            height="1100"
            draggable="false"
            onError={(event) => {
              event.currentTarget.src = siteConfig.productPlaceholder;
            }}
          />
          {images.length > 1 && (
            <div className="gallery-dots" role="tablist" aria-label="Image gallery">
              {images.map((image, idx) => (
                <button
                  key={image + idx}
                  type="button"
                  className={idx === activeIndex ? "active" : ""}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  aria-selected={idx === activeIndex}
                  role="tab"
                />
              ))}
            </div>
          )}
          {product.badge && <span className="product-badge" style={{ left: 14, right: "auto" }}>{product.badge}</span>}
        </div>
        {images.length > 1 && (
          <div className="thumb-row">
            {images.map((image, idx) => (
              <button
                key={image + idx}
                type="button"
                className={idx === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1} for ${product.name}`}
              >
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
        {images.length > 1 && (
          <div className="gallery-nav">
            <button className="outline-button" type="button" onClick={handlePrev} aria-label="Previous image">‹</button>
            <button className="outline-button" type="button" onClick={handleNext} aria-label="Next image">›</button>
          </div>
        )}
      </div>

      <article className="product-info">
        <Link to={`/shop?category=${category?.slug || ""}`} className="detail-eyebrow" style={{ display: "inline-block", margin: 0 }}>
          {category?.name}
        </Link>
        <h1>{product.name}</h1>
        <p>{product.shortDescription}</p>
        <div className="price-row detail">
          {hasPrice ? (
            <>
              <strong>{formatPrice(product.price)}</strong>
              {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            </>
          ) : (
            <strong style={{ color: "var(--gold-light)" }}>DM for Price</strong>
          )}
        </div>
        <span className={product.available ? "available" : "unavailable"} style={{ marginBottom: 14 }}>
          {product.available ? "● Available" : "● Currently unavailable"}
        </span>
        <p style={{ color: "var(--text-soft)", lineHeight: 1.7 }}>{product.description}</p>
        <div className="tags">
          {product.tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {hasPrice && (
          <div className="quantity-row large">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
              <Plus size={16} />
            </button>
          </div>
        )}
        <div className="detail-actions">
          {hasPrice && (
            <button className="gold-button" type="button" disabled={!product.available} onClick={() => addToCart(product, quantity)}>
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          )}
          <a className="outline-button" href={productWhatsAppUrl(product, quantity, productUrl)} target="_blank" rel="noreferrer">
            Order on WhatsApp
          </a>
        </div>
      </article>

      {product.video && (
        <section className="video-section">
          <h2>Product Video</h2>
          <video
            src={product.video}
            muted
            controls
            preload="metadata"
            poster={product.images?.[0] || siteConfig.productPlaceholder}
            playsInline
          />
        </section>
      )}
    </section>
  );
}