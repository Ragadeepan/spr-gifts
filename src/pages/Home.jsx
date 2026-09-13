import { Gift, MessageCircle, PackageCheck, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CategorySlider } from "../components/CategorySlider";
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

  const featuredProducts = products.filter((product) => product.featured);
  const homeCategories = categories;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow reveal reveal-1">{siteConfig.brandName}</p>
          <h1 className="reveal reveal-2">{siteConfig.headline}</h1>
          <p className="reveal reveal-3">{siteConfig.subheadline}</p>
          <p className="reveal reveal-3" style={{ color: "var(--text-soft)" }}>
            {siteConfig.description}
          </p>
          <div className="hero-actions reveal reveal-4">
            <Link className="gold-button" to="/shop">
              Explore Gifts
            </Link>
            <WhatsAppButton className="outline-button" message={`Hello ${siteConfig.brandName}, I'd like to enquire about a gift.`} />
          </div>
        </div>
        <div className="hero-visual reveal reveal-3" aria-label="Premium SPR Gifts brand presentation">
          <img src={siteConfig.heroImage} alt="Premium gift presentation" />
          <div>
            <span>Premium</span>
            <strong>Gift Showcase</strong>
            <p>Beautifully curated gifts and personalized surprises. Final order is confirmed through WhatsApp.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Curated Collections"
          title="Featured Categories"
          text="Browse our exclusive collections."
        />
        <CategorySlider categories={homeCategories} title="Featured Categories" />
      </section>

      <section className="section">
        <SectionTitle eyebrow="Available Now" title="Featured Products" />
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="section">
        <SectionTitle eyebrow="The SPR Promise" title={`Why Choose ${siteConfig.brandShort}`} />
        <div className="trust-grid">
          {[
            [Sparkles, "Opening Offer Prices", "Special launch pricing on Jhumki Gift Sets."],
            [PackageCheck, "Premium Packaging", "Every set comes in an elegant gift box."],
            [MessageCircle, "Easy WhatsApp Ordering", "Ask questions and confirm details directly before ordering."],
            [Gift, "Perfect for Gifting", "Birthdays, anniversaries, festivals and special moments."],
            [Palette, "Pan India Delivery", "We deliver across India 🇮🇳"],
          ].map(([Icon, title, text]) => (
            <article className="trust-card reveal" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section how-order">
        <SectionTitle eyebrow="Simple Process" title="How To Order" text="Three steps from browse to delivery. No online payment required at this stage." />
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
          <p className="eyebrow">Instagram</p>
          <h2>Follow @sprgifts.in for latest designs.</h2>
          <p>See our latest Jhumki gift sets, flower bouquets and creations on Instagram.</p>
        </div>
        <InstagramButton />
      </section>

      <section className="cta-band">
        <p className="eyebrow" style={{ color: "var(--gold-light)" }}>Order via WhatsApp</p>
        <h2>Ready to order?</h2>
        <p>Send us a message on WhatsApp with the product name. We'll share details and delivery charges.</p>
        <WhatsAppButton message={`Hello ${siteConfig.brandName}, I'd like to place an order.`} />
      </section>
    </>
  );
}