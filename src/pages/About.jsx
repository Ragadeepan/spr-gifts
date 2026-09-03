import { useEffect } from "react";
import { Gift, Heart, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../components/SectionTitle";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { siteConfig } from "../data/siteConfig";
import { setSeo } from "../utils/seo";

export function About() {
  useEffect(() => {
    setSeo({
      title: `About ${siteConfig.brandName} | Premium Personalized Gifts`,
      description: `${siteConfig.brandName} is a modern gift brand focused on beautiful, personalized and memorable gifts from Tamil Nadu, India.`,
      path: "/about",
    });
  }, []);

  return (
    <section className="page section about-page">
      <SectionTitle eyebrow="About" title={siteConfig.brandName} text="A premium gifting brand for personalized gifts, bouquets and curated surprises — made for special moments." />

      <div className="content-panel" style={{ marginBottom: 28 }}>
        <p>
          {siteConfig.brandName} is a modern gifting brand focused on beautiful, personalized and memorable gifts.
          The collection is designed for people who want gifting to feel personal, polished and thoughtful.
        </p>
        <p>
          We curate bouquets, chocolate bouquets, earrings gift boxes, customized gifts and celebration-ready gift
          sets — each prepared with care and presented with a premium finish.
        </p>
        <p>
          This website is a showcase and order-request experience. You can browse products, add favourites to the
          cart, and confirm availability or custom details directly through WhatsApp.
        </p>
      </div>

      <div className="trust-grid" style={{ marginBottom: 36 }}>
        {[
          [Sparkles, "Thoughtfully Made Gifts", "Each piece is prepared with intention."],
          [Gift, "Personalized for Your Moments", "Names, themes and messages tailored to you."],
          [PackageCheck, "Beautifully Packed", "Premium wrapping for a gift-ready first impression."],
          [Heart, "Made for Memories", "Gifts designed to mark what matters."],
          [Sparkles, "Modern Gifting Studio", "A boutique approach to every order."],
        ].map(([Icon, title, text]) => (
          <article className="trust-card" key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="gold-button" to="/shop">Browse Collection</Link>
        <WhatsAppButton className="outline-button" />
      </div>
    </section>
  );
}