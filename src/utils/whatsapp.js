import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "./formatPrice";

const baseUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

export function createWhatsAppUrl(
  message = `Hello ${siteConfig.brandName}\n\nI would like to enquire about your gifts. Please share availability and confirm the delivery charge for my location before finalizing.`,
) {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function createCartMessage(items, subtotal) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const lines = [
    `Hello ${siteConfig.brandName}`,
    "",
    "I would like to order the following products:",
    "",
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push(`Displayed price: ${formatPrice(item.price)}`);
    lines.push("");
  });

  lines.push(`Total Items: ${totalItems}`);
  if (subtotal) lines.push(`Estimated Total: ${formatPrice(subtotal)}`);
  lines.push("");
  lines.push("Please confirm availability and the delivery charge for my location before finalizing the order.");
  lines.push(`Website: ${siteConfig.canonicalUrl}`);
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function createProductMessage(product, quantity, productUrl = "") {
  const hasPrice = product.price !== null && product.price !== undefined;
  const displayedPrice = product.priceLabel || formatPrice(product.price);
  const lines = [
    `Hello ${siteConfig.brandName}`,
    "",
    `I would like to order/enquire about: ${product.name}`,
    hasPrice ? `Quantity: ${quantity}` : "Rose count/design: Please share available options",
    `Displayed price: ${displayedPrice}`,
    "",
    "Please confirm availability and the delivery charge for my location before finalizing the order.",
  ];

  if (productUrl) lines.push(`Product URL: ${productUrl}`);
  else lines.push(`Website: ${siteConfig.canonicalUrl}`);

  return lines.join("\n");
}

export function cartWhatsAppUrl(items, subtotal) {
  return createWhatsAppUrl(createCartMessage(items, subtotal));
}

export function productWhatsAppUrl(product, quantity, productUrl) {
  return createWhatsAppUrl(createProductMessage(product, quantity, productUrl));
}
