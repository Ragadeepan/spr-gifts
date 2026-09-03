import { MessageCircle } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

export function WhatsAppButton({ message, children = "Order on WhatsApp", className = "gold-button" }) {
  return (
    <a className={className} href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer">
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
