import { Instagram } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export function InstagramButton({ compact = false }) {
  return (
    <a
      className={compact ? "icon-link" : "outline-button"}
      href={siteConfig.instagramUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Follow us on Instagram"
    >
      <Instagram size={18} />
      {!compact && "Follow us on Instagram"}
    </a>
  );
}
