import { Instagram, MessageCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { siteConfig } from "../data/siteConfig";
import { createWhatsAppUrl } from "../utils/whatsapp";

export function Footer() {
  const footerCategories = categories.slice(0, 6);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} />
          <h2>{siteConfig.brandName}</h2>
          <p>{siteConfig.tagline}</p>
          <p style={{ marginTop: 10, color: "var(--muted)", fontSize: "0.88rem" }}>
            Earrings • Jhumki Gift Sets • Flower Bouquets
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h3>Collections</h3>
          {footerCategories.map((category) => (
            <Link key={category.id} to={`/shop?category=${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Get in Touch</h3>
          <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MessageCircle size={15} /> WhatsApp: +91 {siteConfig.whatsappDisplayNumber}
          </a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Instagram size={15} /> {siteConfig.instagramHandle}
          </a>
          <span style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, color: "var(--gold-light)" }}>
            <Truck size={15} /> Pan India Delivery 🇮🇳
          </span>
        </div>
      </div>
      <p className="copyright">© 2026 {siteConfig.brandName}. Crafted for special moments.</p>
    </footer>
  );
}