import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "./formatPrice";

const baseUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

export function createWhatsAppUrl(message = `Hello ${siteConfig.brandName}`) {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function createCartMessage(items, subtotal) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const lines = [
    `Hello ${siteConfig.brandName} \u{1F44B}`,
    "",
    "I would like to enquire/order for the following products:",
    "",
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push(`Price: ${formatPrice(item.price)}`);
    lines.push("");
  });

  lines.push(`Total Items: ${totalItems}`);
  if (subtotal) lines.push(`Estimated Total: ${formatPrice(subtotal)}`);
  lines.push("");
  lines.push("Please share availability, customization options and final price.");
  lines.push("");
  lines.push("Thank you \u2764\uFE0F");

  return lines.join("\n");
}

export function createProductMessage(product, quantity, productUrl = "") {
  const lines = [
    `Hello ${siteConfig.brandName} \u{1F44B}`,
    "",
    "I'm interested in:",
    "",
    `Product: ${product.name}`,
    `Quantity: ${quantity}`,
  ];

  if (productUrl) lines.push(`Product URL: ${productUrl}`);

  lines.push("", "Please share details and availability.", "", "Thank you \u2764\uFE0F");
  return lines.join("\n");
}

export function cartWhatsAppUrl(items, subtotal) {
  return createWhatsAppUrl(createCartMessage(items, subtotal));
}

export function productWhatsAppUrl(product, quantity, productUrl) {
  return createWhatsAppUrl(createProductMessage(product, quantity, productUrl));
}