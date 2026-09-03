import { useEffect } from "react";
import { SectionTitle } from "../components/SectionTitle";
import { siteConfig } from "../data/siteConfig";
import { setSeo } from "../utils/seo";

export function About() {
  useEffect(() => {
    setSeo({
      title: `About ${siteConfig.brandName} | Premium Personalized Gifts`,
      description: `${siteConfig.brandName} is a modern gift brand focused on beautiful, personalized and memorable gifts.`,
      path: "/about",
    });
  }, []);

  return (
    <section className="page section about-page">
      <SectionTitle eyebrow="About" title={siteConfig.brandName} />
      <div className="content-panel">
        <p>
          {siteConfig.brandName} is a modern gift brand focused on beautiful,
          personalized and memorable gifts. The collection is designed for people
          who want gifting to feel personal, polished and thoughtful.
        </p>
        <p>
          This website is a showcase and order-request experience. You can browse
          products, add favourites to the cart, and confirm availability or custom
          details directly through WhatsApp.
        </p>
      </div>
    </section>
  );
}
