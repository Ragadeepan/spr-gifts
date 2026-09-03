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
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h3>Categories</h3>
          {footerCategories.map((category) => (
            <Link key={category.id} to={`/shop?category=${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
            WhatsApp: {siteConfig.whatsappDisplayNumber}
          </a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            Follow us on Instagram
          </a>
          <span>{siteConfig.instagramHandle}</span>
        </div>
      </div>
      <p className="copyright">© 2026 {siteConfig.brandName}. All rights reserved.</p>
    </footer>
  );
}
