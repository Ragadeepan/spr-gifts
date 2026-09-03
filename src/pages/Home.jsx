import { Gift, MessageCircle, PackageCheck, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CategorySlider } from "../components/CategorySlider";
import { InstagramButton } from "../components/InstagramButton";
import { ProductGrid } from "../components/ProductGrid";
import { ProductSlider } from "../components/ProductSlider";
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
  const homeCategories = categories.slice(0, 8);

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
            <WhatsAppButton className="outline-button" message={`Hello ${siteConfig.brandName}, I'd like to enquire about a personalized gift.`} />
          </div>
        </div>
        <div className="hero-visual reveal reveal-3" aria-label="Premium SPR Gifts brand presentation">
          <img src={siteConfig.heroImage} alt="Premium gift bouquet presentation" />
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
          text="Add or edit categories from one file whenever your collection grows."
        />
        <CategorySlider categories={homeCategories} title="Featured Categories" />
      </section>

      <section className="section">
        <SectionTitle eyebrow="Customer Favourites" title="Best Sellers" />
        <ProductSlider products={bestSellers} title="Best Sellers" />
      </section>

      <section className="section split-band">
        <div>
          <SectionTitle eyebrow="Bouquet Studio" title="Featured Bouquets" text="Hand-arranged bouquets and personalized surprises for every occasion." />
          <ProductGrid products={bouquets} />
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Personal Touch" title="Customized Gifts" text="Make it yours with names, initials, themes and personal messages." />
        <ProductGrid products={customGifts} />
      </section>

      <section className="section">
        <SectionTitle eyebrow="The SPR Promise" title={`Why Choose ${siteConfig.brandShort}`} />
        <div className="trust-grid">
          {[
            [Palette, "Personalized Options", "Custom colors, names, themes and messages can be discussed."],
            [PackageCheck, "Carefully Packed", "Products are planned for a gift-ready first impression."],
            [MessageCircle, "Easy WhatsApp Ordering", "Ask questions and confirm details directly before ordering."],
            [Gift, "Special Occasion Gifts", "Ideas for birthdays, anniversaries and meaningful moments."],
            [Sparkles, "Custom Gift Requests", "Share your idea and get suitable options through WhatsApp."],
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
          <p className="eyebrow">Instagram Preview</p>
          <h2>Follow new gift styles and bouquet ideas.</h2>
          <p>See our latest gifts, bouquets and creations on Instagram.</p>
        </div>
        <InstagramButton />
      </section>

      <section className="cta-band">
        <p className="eyebrow" style={{ color: "var(--gold-light)" }}>Personalized Gifting</p>
        <h2>Need a personalized gift idea?</h2>
        <p>Send your occasion, preferred style and budget. {siteConfig.brandShort} will help you confirm details on WhatsApp.</p>
        <WhatsAppButton message={`Hello ${siteConfig.brandName}, I'd love a personalized gift recommendation. My occasion/budget is: `} />
      </section>
    </>
  );
}
