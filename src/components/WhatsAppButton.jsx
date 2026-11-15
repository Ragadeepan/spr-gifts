import { createWhatsAppUrl } from "../utils/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppButton({ message, children = "Order on WhatsApp", className = "gold-button" }) {
  return (
    <a className={className} href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer">
      <WhatsAppIcon size={18} />
      {children}
    </a>
  );
}
