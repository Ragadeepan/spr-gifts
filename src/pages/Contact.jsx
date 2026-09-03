import { Instagram, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { InstagramButton } from "../components/InstagramButton";
import { SectionTitle } from "../components/SectionTitle";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { siteConfig } from "../data/siteConfig";
import { setSeo } from "../utils/seo";

export function Contact() {
  useEffect(() => {
    setSeo({
      title: `Contact ${siteConfig.brandName} | WhatsApp Gift Orders`,
      description: `Contact ${siteConfig.brandName} on WhatsApp or Instagram for premium gifts and custom bouquet orders in Tamil Nadu, India.`,
      path: "/contact",
    });
  }, []);

  return (
    <section className="page section contact-page">
      <SectionTitle
        eyebrow="Contact"
        title="Order Requests & Custom Gifts"
        text="Reach out for availability, customizations or to confirm your order. We respond on WhatsApp."
      />
      <div className="contact-grid">
        <article className="content-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MessageCircle size={20} color="var(--gold)" /> WhatsApp
          </h2>
          <p>Message us to check availability, customize a product or confirm your order.</p>
          <p style={{ color: "var(--gold-light)", fontWeight: 600, fontSize: "1.1rem" }}>+91 {siteConfig.whatsappDisplayNumber}</p>
          <WhatsAppButton />
        </article>
        <article className="content-panel">
          <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Instagram size={20} color="var(--gold)" /> Instagram
          </h2>
          <p>Follow new gift styles, bouquet ideas and brand updates.</p>
          <p style={{ color: "var(--gold-light)", fontWeight: 600 }}>{siteConfig.instagramHandle}</p>
          <InstagramButton />
        </article>
      </div>
    </section>
  );
}