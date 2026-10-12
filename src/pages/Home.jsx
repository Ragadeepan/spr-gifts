import { Gift, MessageCircle, PackageCheck, Sparkles, Heart, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CategorySlider } from "../components/CategorySlider";
import { GiftShowcase } from "../components/GiftShowcase";
import { FeaturedProductsSection } from "../components/FeaturedProductsSection";
import { InstagramButton } from "../components/InstagramButton";
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

  const homeCategories = categories;

  const trustItems = [
    { Icon: Sparkles, title: "Opening Offers", desc: "Special launch pricing on both Jhumka Gift Sets" },
    { Icon: PackageCheck, title: "Premium Packaging", desc: "Jhumka sets arrive arranged in elegant gift boxes" },
    { Icon: Shield, title: "Clear Confirmation", desc: "Availability, price and delivery charge are confirmed before finalizing" },
    { Icon: Truck, title: "Delivery Updates", desc: "Delivery charge depends on your location and is shared on WhatsApp" },
    { Icon: RotateCcw, title: "Direct Support", desc: "Questions and order requests are handled through WhatsApp" },
    { Icon: Heart, title: "Thoughtful Gifting", desc: "Curated for birthdays, anniversaries, festivals and surprises" },
  ];

  const howOrderSteps = [
    { num: "01", title: "Browse & Select", desc: "Explore our curated Jhumka sets and handmade bouquet" },
    { num: "02", title: "Add to Cart", desc: "Choose quantity and add to your cart" },
    { num: "03", title: "Order on WhatsApp", desc: "Share the cart or product request directly with us" },
    { num: "04", title: "Confirm Delivery", desc: "We confirm availability and delivery charge before finalizing" },
  ];

  return (
    <>
      {/* HERO SECTION */}
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
              <Gift size={18} /> Explore Collection
            </Link>
            <WhatsAppButton className="outline-button" message={`Hello ${siteConfig.brandName}\n\nI'd like to enquire about a gift. Please share availability and confirm the delivery charge for my location before finalizing.`}>
              <MessageCircle size={18} /> Order on WhatsApp
            </WhatsAppButton>
          </div>
          <div className="hero-trust reveal reveal-4">
            <div className="trust-item">
              <Truck size={18} /> Delivery Charge Confirmed
            </div>
            <div className="trust-item">
              <Shield size={18} /> WhatsApp Ordering
            </div>
            <div className="trust-item">
              <RotateCcw size={18} /> Direct Support
            </div>
            <div className="trust-item">
              <Heart size={18} /> Handcrafted
            </div>
          </div>
        </div>
        <div className="hero-visual reveal reveal-3" aria-label="Premium SPR Gifts brand presentation">
          <GiftShowcase />
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="section categories-section">
        <CategorySlider categories={homeCategories} title="Shop by Category" />
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section products-section">
        <FeaturedProductsSection />
      </section>

      {/* WHY CHOOSE SPR */}
      <section className="section trust-section">
        <SectionTitle eyebrow="Why Choose SPR" title={`Why Choose ${siteConfig.brandShort}`} text="Every gift is crafted with attention to detail and love for your special moments." />
        <div className="trust-grid">
          {trustItems.map((item, idx) => (
            <article className="trust-card reveal" key={item.title} style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="trust-icon">
                <item.Icon size={28} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="section how-order-section">
        <SectionTitle eyebrow="Simple Process" title="How to Order in 4 Easy Steps" text="No online payment required. Order directly via WhatsApp." />
        <div className="steps-grid">
          {howOrderSteps.map((step, idx) => (
            <article className="step-card reveal" key={step.num} style={{ animationDelay: `${idx * 120}ms` }}>
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="instagram-section">
        <div className="instagram-content">
          <div className="instagram-badge">
            <Star size={16} /> @sprgifts.in
          </div>
          <h2>Follow Us for Latest Gifts</h2>
          <p>Discover Jhumka gift sets, handmade bouquet updates, and opening offers on Instagram.</p>
        </div>
        <InstagramButton />
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="cta-band">
        <div className="cta-content">
          <span className="gift-micro" aria-hidden="true"><Gift size={20} /></span>
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>Exclusive Offers</p>
          <h2>Want Early Access to New Collections?</h2>
          <p>Message us on WhatsApp to get notified about new launches and special offers.</p>
        </div>
        <div className="cta-actions">
          <WhatsAppButton message={`Hello ${siteConfig.brandName}\n\nI'd like to get updates on new collections.`}>
            <MessageCircle size={18} /> Get Updates on WhatsApp
          </WhatsAppButton>
          <Link className="gold-button" to="/shop">
            <Gift size={18} /> Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
