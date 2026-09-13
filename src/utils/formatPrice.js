import { siteConfig } from "../data/siteConfig";

export function formatPrice(value) {
  if (value === null || value === undefined) return "DM for Price";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(value);
}