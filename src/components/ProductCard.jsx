import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryById } from "../data/categories";
import { siteConfig } from "../data/siteConfig";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const category = getCategoryById(product.category);

  return (
    <article className="product-card reveal">
      <Link className="product-image" to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
        <img
          src={product.images?.[0] || siteConfig.productPlaceholder}
          alt={`${product.name} from ${siteConfig.brandName}`}
          loading="lazy"
          decoding="async"
          width="640"
          height="800"
          onError={(event) => {
            event.currentTarget.src = siteConfig.productPlaceholder;
          }}
        />
        {!product.available && <span className="stock-badge">Out of stock</span>}
        {product.available && product.badge && <span className="product-badge">{product.badge}</span>}
      </Link>
      <div className="product-body">
        <p>{category?.name || product.category}</p>
        <h3>{product.name}</h3>
        <p style={{ fontSize: "0.9rem", margin: "4px 0", color: "var(--text-soft)" }}>{product.shortDescription}</p>
        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
        <span className={product.available ? "available" : "unavailable"}>
          {product.available ? "● Available" : "● Currently unavailable"}
        </span>
        <div className="card-actions">
          <Link to={`/product/${product.slug}`}>View Details</Link>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={!product.available}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}