import { Outlet, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { createWhatsAppUrl } from "../utils/whatsapp";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const targets = [...document.querySelectorAll("[data-scroll-reveal]")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    targets.forEach((target, index) => {
      target.style.setProperty("--scroll-reveal-delay", `${(index % 4) * 70}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <a className="floating-whatsapp" href={createWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={19} />
        <span>WhatsApp</span>
      </a>
      <CartDrawer />
      <Footer />
    </>
  );
}
