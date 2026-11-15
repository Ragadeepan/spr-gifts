import { ChevronRight, MessageCircle, ShoppingBag } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "../utils/formatPrice";
import { productWhatsAppUrl } from "../utils/whatsapp";

export function FeaturedProductsSection() {
  const { addToCart, items } = useCart();
  const featuredProducts = products.filter((product) => product.featured);
  const isInCart = (productId) => items.some((item) => item.id === productId);

  return (
    <section className="featured-products-section" aria-label="Featured Products">
      <div className="section-header">
        <div className="section-header-left">
          <p className="eyebrow">Available Now</p>
          <h2>Featured Gifts</h2>
        </div>
      </div>

      <div className="premium-product-grid">
        {featuredProducts.map((product) => (
          <FeaturedProductCard
            key={product.id}
            product={product}
            isInCart={isInCart(product.id)}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedProductCard({ product, isInCart, onAddToCart }) {
  const hasPrice = product.price !== null && product.price !== undefined;
  const images = product.images?.length ? product.images : [siteConfig.productPlaceholder];
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveImage((index) => (index + 1) % images.length), 4500);
    return () => window.clearInterval(timer);
  }, [images.length]);
  const showImage = (index) => setActiveImage((index + images.length) % images.length);
  const categoryLabel = product.category === "jhumka-gift-sets"
    ? "Jhumki Gift Sets"
    : product.category === "chocolate-packets"
      ? "Chocolate Packets"
      : product.category === "chocolate-bouquets"
        ? "Chocolate Bouquets"
        : "Handmade Rose Bouquets";

  return (
    <article className="featured-product-card">
      <div className="product-image-wrapper">
        <Link to={`/product/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img
            src={images[activeImage] || siteConfig.productPlaceholder}
            alt={`${product.name} product photo ${activeImage + 1} from ${siteConfig.brandName}`}
            loading={product.sortOrder <= 2 ? "eager" : "lazy"}
            decoding="async"
            width="600"
            height="750"
            className="product-image"
            onError={(event) => {
              event.currentTarget.src = siteConfig.productPlaceholder;
            }}
          />
          <div className="product-image-overlay">
            <span className="overlay-text">View Details</span>
            <ChevronRight size={18} />
          </div>
        </Link>
        {images.length > 1 && (
          <>
            <button className="product-gallery-arrow previous" type="button" aria-label={`Previous ${product.name} image`} onClick={() => showImage(activeImage - 1)}>
              <ChevronLeft size={18} />
            </button>
            <button className="product-gallery-arrow next" type="button" aria-label={`Next ${product.name} image`} onClick={() => showImage(activeImage + 1)}>
              <ChevronRight size={18} />
            </button>
            <div className="product-gallery-dots" role="tablist" aria-label={`${product.name} images`}>
              {images.map((image, index) => (
                <button key={image} type="button" className={index === activeImage ? "active" : ""} onClick={() => showImage(index)} aria-label={`Show image ${index + 1}`} aria-selected={index === activeImage} role="tab" />
              ))}
            </div>
          </>
        )}
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>

      <div className="product-content">
        <p className="product-category">{categoryLabel}</p>
        <Link to={`/product/${product.slug}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
        {product.code && <p className="product-code">Code: {product.code}</p>}
        <p className="product-short-desc">{product.shortDescription}</p>
        <div className="product-price-row">
          {hasPrice ? (
            <>
              <strong className="current-price">{formatPrice(product.price)}</strong>
              {product.oldPrice && <del className="old-price">{formatPrice(product.oldPrice)}</del>}
            </>
          ) : (
            <strong className="dm-price">{product.priceLabel || formatPrice(product.price)}</strong>
          )}
        </div>
        {hasPrice ? (
          <button
            className="add-to-cart-btn gold-button"
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!product.available}
          >
            <ShoppingBag size={16} />
            {isInCart ? "Added" : "Add to Cart"}
          </button>
        ) : (
          <a
            className="add-to-cart-btn outline-button"
            href={productWhatsAppUrl(product, 1, `${siteConfig.canonicalUrl}/product/${product.slug}`)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} />
            Order on WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
