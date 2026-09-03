import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "./formatPrice";

const baseUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

export function createWhatsAppUrl(message = `Hello ${siteConfig.brandName}`) {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function createCartMessage(items, subtotal) {
  const lines = [
    `Hello ${siteConfig.brandName} 👋`,
    "",
    "I would like to order:",
    "",
    ...items.flatMap((item, index) => [
      `${index + 1}. ${item.name}`,
      `Quantity: ${item.quantity}`,
      `Price: ${formatPrice(item.price)}`,
      "",
    ]),
    `Total: ${formatPrice(subtotal)}`,
    "",
    "Please confirm availability and order details.",
    "",
    "Thank you.",
  ];

  return lines.join("\n");
}

export function createProductMessage(product, quantity, productUrl = "") {
  const lines = [
    `Hello ${siteConfig.brandName} 👋`,
    "",
    "I am interested in:",
    "",
    `Product: ${product.name}`,
    `Product ID: ${product.id}`,
    `Price: ${formatPrice(product.price)}`,
    `Quantity: ${quantity}`,
  ];

  if (productUrl) lines.push(`Product URL: ${productUrl}`);

  lines.push("", "Please share availability and order details.", "", "Thank you.");
  return lines.join("\n");
}

export function cartWhatsAppUrl(items, subtotal) {
  return createWhatsAppUrl(createCartMessage(items, subtotal));
}

export function productWhatsAppUrl(product, quantity, productUrl) {
  return createWhatsAppUrl(createProductMessage(product, quantity, productUrl));
}
