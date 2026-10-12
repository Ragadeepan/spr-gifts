import { ChevronRight, MessageCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
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
          <h2>Featured Products</h2>
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
  const categoryLabel = product.category === "jhumka-gift-sets"
    ? "Jhumka Gift Sets"
    : "Handmade Flower Bouquets";

  return (
    <article className="featured-product-card">
      <Link to={`/product/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
        <div className="product-image-wrapper">
          <img
            src={product.images?.[0] || siteConfig.productPlaceholder}
            alt={`${product.name} product photo from ${siteConfig.brandName}`}
            loading="eager"
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
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>
      </Link>

      <div className="product-content">
        <p className="product-category">{categoryLabel}</p>
        <Link to={`/product/${product.slug}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
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
