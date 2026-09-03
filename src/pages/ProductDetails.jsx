import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  const [activeImage, setActiveImage] = useState(product?.images?.[0]);
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

    setActiveImage(product.images?.[0] || siteConfig.productPlaceholder);
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
        <h1>Product not found</h1>
        <p>This gift may have been moved or removed.</p>
        <Link className="gold-button" to="/shop">
          Back to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="page section product-detail">
      <div className="gallery">
        <img
          className="main-product-image"
          src={activeImage || siteConfig.productPlaceholder}
          alt={product.name}
          width="900"
          height="1100"
          onError={(event) => {
            event.currentTarget.src = siteConfig.productPlaceholder;
          }}
        />
        {product.images?.length > 1 && (
          <div className="thumb-row">
            {product.images.map((image) => (
              <button key={image} type="button" onClick={() => setActiveImage(image)} aria-label={`View image for ${product.name}`}>
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <article className="product-info">
        <Link to={`/shop?category=${category?.slug || ""}`}>{category?.name}</Link>
        <h1>{product.name}</h1>
        <p>{product.shortDescription}</p>
        <div className="price-row detail">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
        <span className={product.available ? "available" : "unavailable"}>
          {product.available ? "Available" : "Currently unavailable"}
        </span>
        <p>{product.description}</p>
        <div className="tags">
          {product.tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="quantity-row large">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
        <div className="detail-actions">
          <button className="gold-button" type="button" disabled={!product.available} onClick={() => addToCart(product, quantity)}>
            <ShoppingBag size={18} />
            Add to Cart
          </button>
          <a className="outline-button" href={productWhatsAppUrl(product, quantity, productUrl)} target="_blank" rel="noreferrer">
            Order This on WhatsApp
          </a>
        </div>
      </article>

      {product.video && (
        <section className="video-section">
          <h2>Product Video</h2>
          <video src={product.video} muted controls preload="metadata" />
        </section>
      )}
    </section>
  );
}
