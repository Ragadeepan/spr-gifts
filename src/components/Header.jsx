import { Instagram, Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { categories } from "../data/categories";
import { siteConfig } from "../data/siteConfig";
import { createWhatsAppUrl } from "../utils/whatsapp";

const navLinks = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="site-header">
      <Link className="brand-lockup" to="/" aria-label={`${siteConfig.brandName} home`}>
        <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} />
        <span>{siteConfig.brandName}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map(([label, path]) => (
          <NavLink key={path} to={path}>
            {label}
          </NavLink>
        ))}
        <button type="button" onClick={() => setCategoryOpen((value) => !value)}>
          Categories
        </button>
        {categoryOpen && (
          <div className="category-menu">
            {categories.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.slug}`} onClick={() => setCategoryOpen(false)}>
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="header-actions">
        <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram">
          <Instagram size={19} />
        </a>
        <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Order on WhatsApp">
          <MessageCircle size={19} />
        </a>
        <button className="cart-icon" type="button" onClick={openCart} aria-label={`Open cart with ${count} items`}>
          <ShoppingBag size={20} />
          <span>{count}</span>
        </button>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X />
        </button>
        <img src={siteConfig.logo} alt="" />
        {[...navLinks].map(([label, path]) => (
          <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
        <p>Categories</p>
        {categories.map((category) => (
          <Link key={category.id} to={`/shop?category=${category.slug}`} onClick={() => setMenuOpen(false)}>
            {category.name}
          </Link>
        ))}
        <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
          Follow us on Instagram
        </a>
      </div>
    </header>
  );
}
