import { Gift, MessageCircle, PackageCheck, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { InstagramButton } from "../components/InstagramButton";
import { ProductGrid } from "../components/ProductGrid";
import { SectionTitle } from "../components/SectionTitle";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { addJsonLd, organizationJsonLd, setSeo } from "../utils/seo";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    setSeo();
    addJsonLd("org-jsonld", organizationJsonLd());
  }, []);

  const bestSellers = products.filter((product) => product.featured).slice(0, 4);
  const bouquets = products.filter((product) => product.category.includes("bouquet")).slice(0, 4);
  const customGifts = products.filter((product) => product.category === "customized-gifts").slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{siteConfig.brandName}</p>
          <h1>Special Gifts. Personalized Moments.</h1>
          <p>{siteConfig.description}</p>
          <div className="hero-actions">
            <Link className="gold-button" to="/shop">
              Explore Gifts
            </Link>
            <WhatsAppButton className="outline-button" />
          </div>
        </div>
        <div className="hero-visual" aria-label="Premium SPR Gifts brand presentation">
          <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} />
          <div>
            <span>Premium</span>
            <strong>Gift Showcase</strong>
            <p>No online payment required at this stage. Orders are confirmed through WhatsApp.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Curated Categories"
          title="Featured Categories"
          text="Add or edit categories from one file whenever your collection grows."
        />
        <div className="category-grid">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Customer Favourites" title="Best Sellers" />
        <ProductGrid products={bestSellers} />
      </section>

      <section className="section split-band">
        <div>
          <SectionTitle eyebrow="Bouquet Studio" title="Featured Bouquets" />
          <ProductGrid products={bouquets} />
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Personal Touch" title="Customized Gifts" />
        <ProductGrid products={customGifts} />
      </section>

      <section className="section">
        <SectionTitle eyebrow="Why SPR" title={`Why Choose ${siteConfig.brandName}`} />
        <div className="trust-grid">
          {[
            [Palette, "Personalized Gift Options", "Custom colors, names, themes and messages can be discussed."],
            [PackageCheck, "Carefully Packed", "Products are planned for a gift-ready first impression."],
            [MessageCircle, "Easy WhatsApp Ordering", "Ask questions and confirm details directly before ordering."],
            [Gift, "Special Occasion Gifts", "Gift ideas for birthdays, anniversaries and meaningful moments."],
            [Sparkles, "Custom Gift Requests", "Share your idea and get suitable options through WhatsApp."],
          ].map(([Icon, title, text]) => (
            <article className="trust-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section how-order">
        <SectionTitle eyebrow="Simple Process" title="How To Order" />
        <div className="steps">
          {[
            ["01", "Browse your favourite gift"],
            ["02", "Add to cart or choose Order on WhatsApp"],
            ["03", "Confirm your order through WhatsApp"],
          ].map(([number, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{text}</h3>
              <p>No online payment required at this stage.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="instagram-section">
        <div>
          <p className="eyebrow">Instagram Preview</p>
          <h2>Follow new gift styles and bouquet ideas.</h2>
          <p>Use the lightweight link below instead of a heavy Instagram widget for faster loading.</p>
        </div>
        <InstagramButton />
      </section>

      <section className="cta-band">
        <h2>Need a personalized gift idea?</h2>
        <p>Send your occasion, preferred style and budget. SPR GIFTS.IN will help you confirm details on WhatsApp.</p>
        <WhatsAppButton />
      </section>
    </>
  );
}
