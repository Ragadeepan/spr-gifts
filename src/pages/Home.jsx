import { BadgeCheck, Gift, MessageCircle, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { GiftShowcase } from "../components/GiftShowcase";
import { FeaturedProductsSection } from "../components/FeaturedProductsSection";
import { InstagramButton } from "../components/InstagramButton";
import { SectionTitle } from "../components/SectionTitle";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { RoseBouquetSection } from "../components/RoseBouquetSection";
import { siteConfig } from "../data/siteConfig";
import { addJsonLd, organizationJsonLd, setSeo } from "../utils/seo";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    setSeo();
    addJsonLd("org-jsonld", organizationJsonLd());
  }, []);

  const trustItems = [
    { Icon: MessageCircle, title: "Order on WhatsApp", desc: "Ask about a gift and share your preferences directly with us." },
    { Icon: BadgeCheck, title: "Confirm before ordering", desc: "We confirm availability and the final price with you first." },
    { Icon: Truck, title: "Delivery details upfront", desc: "Courier availability and charges depend on your location." },
  ];

  const howOrderSteps = [
    { num: "01", title: "Browse & Select", desc: "Explore the Jhumki sets, handmade bouquets and chocolate gifts." },
    { num: "02", title: "Share Your Choices", desc: "Add a quantity or customization request where needed." },
    { num: "03", title: "Continue on WhatsApp", desc: "Send your enquiry directly to SPR GIFTS.IN." },
    { num: "04", title: "Confirm Before Ordering", desc: "We confirm availability, final price and courier charges with you." },
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
              Order on WhatsApp
            </WhatsAppButton>
          </div>
          <div className="hero-trust reveal reveal-4">
            <div className="trust-item">
              <MessageCircle size={18} /> WhatsApp orders
            </div>
            <div className="trust-item">
              <BadgeCheck size={18} /> Price confirmed first
            </div>
            <div className="trust-item">
              <Truck size={18} /> Delivery by location
            </div>
          </div>
        </div>
        <div className="hero-visual reveal reveal-3" aria-label="Featured SPR GIFTS.IN products">
          <GiftShowcase />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section products-section" data-scroll-reveal>
        <FeaturedProductsSection />
      </section>

      <RoseBouquetSection />

      {/* WHY CHOOSE SPR */}
      <section className="section trust-section" data-scroll-reveal>
        <SectionTitle eyebrow="Why Choose SPR" title={`Why Choose ${siteConfig.brandShort}`} text="Every gift is crafted with attention to detail and love for your special moments." />
        <div className="trust-grid">
          {trustItems.map((item) => (
            <article className="trust-card" data-scroll-reveal key={item.title}>
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
      <section className="section how-order-section" data-scroll-reveal>
        <SectionTitle eyebrow="Simple Process" title="How to Order in 4 Easy Steps" text="No online payment required. Order directly via WhatsApp." />
        <div className="steps-grid">
          {howOrderSteps.map((step) => (
            <article className="step-card" data-scroll-reveal key={step.num}>
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section" data-scroll-reveal aria-labelledby="faq-title">
        <SectionTitle eyebrow="Helpful Details" title="Frequently asked questions" text="A few helpful details before you enquire." />
        <div className="faq-list">
          <details><summary>How do I place an order?</summary><p>Choose a product and send your request on WhatsApp. We’ll confirm the product details, availability and final price with you before an order is finalized.</p></details>
          <details><summary>Do you deliver across India?</summary><p>{siteConfig.deliveryNote}</p></details>
          <details><summary>Can I customize a rose bouquet or chocolate bouquet?</summary><p>Share your preferences in a WhatsApp enquiry. We’ll confirm what is available and the price with you.</p></details>
          <details><summary>What is the price for a 5-rose bouquet?</summary><p>Please contact us for the confirmed price. We are not publishing a 5-rose price until it is confirmed.</p></details>
          <details><summary>Does opening WhatsApp confirm my order?</summary><p>No. WhatsApp opens an enquiry. Your order is not confirmed until product availability, final price and courier charges are confirmed with you.</p></details>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="instagram-section" data-scroll-reveal>
        <div className="instagram-content">
          <div className="instagram-badge">
            <Star size={16} /> @sprgifts.in
          </div>
          <h2>Follow Us for Latest Gifts</h2>
          <p>Discover Jhumki gift sets, handmade bouquet updates, and opening offers on Instagram.</p>
        </div>
        <InstagramButton />
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="cta-band" data-scroll-reveal>
        <div className="cta-content">
          <span className="gift-micro" aria-hidden="true"><Gift size={20} /></span>
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>Exclusive Offers</p>
          <h2>Want Early Access to New Collections?</h2>
          <p>Message us on WhatsApp to get notified about new launches and special offers.</p>
        </div>
        <div className="cta-actions">
          <WhatsAppButton message={`Hello ${siteConfig.brandName}\n\nI'd like to get updates on new collections.`}>
            Get Updates on WhatsApp
          </WhatsAppButton>
          <Link className="gold-button" to="/shop">
            <Gift size={18} /> Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
