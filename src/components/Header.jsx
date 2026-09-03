import { Instagram, Menu, MessageCircle, ShoppingBag, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const categoryRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <Link className="brand-lockup" to="/" aria-label={`${siteConfig.brandName} home`}>
          <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} />
          <span>{siteConfig.brandName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              {label}
            </NavLink>
          ))}
          <div ref={categoryRef}>
            <button type="button" onClick={() => setCategoryOpen((value) => !value)}>
              Categories <ChevronDown size={14} style={{ marginLeft: 2, verticalAlign: "middle" }} />
            </button>
            {categoryOpen && (
              <div className="category-menu" role="menu">
                {categories.slice(0, 8).map((category) => (
                  <Link key={category.id} to={`/shop?category=${category.slug}`} onClick={() => setCategoryOpen(false)}>
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
            {count > 0 && <span>{count}</span>}
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ alignSelf: "flex-end" }}>
          <X />
        </button>
        <img src={siteConfig.logo} alt="" />
        <p>Menu</p>
        {navLinks.map(([label, path]) => (
          <NavLink key={path} to={path} end={path === "/"} onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
        <p>Categories</p>
        {categories.slice(0, 8).map((category) => (
          <Link key={category.id} to={`/shop?category=${category.slug}`} onClick={() => setMenuOpen(false)}>
            {category.name}
          </Link>
        ))}
        <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" style={{ marginTop: 8, color: "var(--gold-light)" }}>
          Follow us on Instagram
        </a>
      </div>
    </>
  );
}