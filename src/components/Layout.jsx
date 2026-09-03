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
