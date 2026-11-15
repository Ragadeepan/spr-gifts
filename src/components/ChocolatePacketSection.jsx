import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getProductBySlug } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { productWhatsAppUrl } from "../utils/whatsapp";

export function ChocolatePacketSection() {
  const product = getProductBySlug("chocolate-packet");
  if (!product?.available) return null;

  return (
    <section className="section chocolate-packet-section" aria-labelledby="chocolate-packet-title">
      <div className="packet-image-panel">
        <img
          src={product.images[0]}
          alt="SPR GIFTS.IN chocolate gift arrangement"
          width="900"
          height="1600"
          loading="lazy"
          decoding="async"
        />
        <span>Custom orders</span>
      </div>
      <div className="packet-copy">
        <p className="eyebrow">A new way to gift</p>
        <h2 id="chocolate-packet-title">Chocolate Packets</h2>
        <p>{product.description}</p>
        <strong className="packet-price-label">{product.priceLabel}</strong>
        <p className="packet-customization">Choose a packet size, quantity and budget. We’ll discuss the arrangement and confirmed price with you on WhatsApp.</p>
        <div className="packet-actions">
          <Link className="gold-button" to={`/product/${product.slug}`}>Customize Your Packet <ArrowRight size={17} /></Link>
          <a className="outline-button" href={productWhatsAppUrl(product, 1, `${siteConfig.canonicalUrl}/product/${product.slug}`)} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
