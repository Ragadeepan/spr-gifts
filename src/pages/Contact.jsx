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
      description: `Contact ${siteConfig.brandName} on WhatsApp or Instagram for premium gifts and custom bouquet orders.`,
      path: "/contact",
    });
  }, []);

  return (
    <section className="page section contact-page">
      <SectionTitle eyebrow="Contact" title="Order Requests & Custom Gifts" />
      <div className="contact-grid">
        <article className="content-panel">
          <h2>WhatsApp</h2>
          <p>Message us to check availability, customize a product or confirm your order.</p>
          <p>{siteConfig.whatsappDisplayNumber}</p>
          <WhatsAppButton />
        </article>
        <article className="content-panel">
          <h2>Instagram</h2>
          <p>Follow new gift styles, bouquet ideas and brand updates.</p>
          <p>{siteConfig.instagramHandle}</p>
          <InstagramButton />
        </article>
      </div>
    </section>
  );
}
