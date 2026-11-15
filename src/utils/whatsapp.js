import { siteConfig } from "../data/siteConfig";
import { formatPrice } from "./formatPrice";

const baseUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

export function createWhatsAppUrl(
  message = `Hello ${siteConfig.brandName}\n\nI would like to enquire about your gifts. Please share availability and confirm the delivery charge for my location before finalizing.`,
) {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function createCartMessage(items, subtotal, options = {}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const lines = [
    `Hello ${siteConfig.brandName}`,
    "",
    "I would like to order the following products:",
    "",
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    if (item.code) lines.push(`Product code: ${item.code}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push(`Displayed price: ${formatPrice(item.price)}`);
    if (item.customizationFields?.length) lines.push("Customization: Please share my preferences and budget on WhatsApp");
    lines.push("");
  });

  lines.push(`Total Items: ${totalItems}`);
  if (subtotal) lines.push(`Estimated Total: ${formatPrice(subtotal)}`);
  lines.push("");
  lines.push(`Customer name: ${options.customerName || "Optional"}`);
  lines.push(`Customization or budget: ${options.customization || "Please share your preferences if applicable"}`);
  lines.push(`Pincode: ${options.pincode || "Please share before confirming delivery"}`);
  lines.push("Please confirm availability, final price and courier charges for my location before finalizing the order.");
  lines.push("This message is an enquiry and does not confirm an order.");
  lines.push(`Website: ${siteConfig.canonicalUrl}`);
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function createProductMessage(product, quantity, productUrl = "", options = {}) {
  const displayedPrice = product.priceLabel || formatPrice(product.price);
  const lines = [
    `Hello ${siteConfig.brandName}`,
    "",
    `I would like to enquire about: ${product.name}`,
  ];

  if (product.code) lines.push(`Product code: ${product.code}`);
  lines.push(`Quantity: ${quantity}`, `Displayed price: ${displayedPrice}`);
  lines.push(`Customer name: ${options.customerName || "Optional"}`);
  if (product.category === "chocolate-packets") {
    lines.push(`Preferred packet size: ${options.packetSize || "Please share"}`);
  }
  lines.push(`Customization: ${options.customization || (product.customizationFields?.length ? "Please share your preferences" : "None specified")}`);
  lines.push(`Preferred budget: ${options.budget || "Please share if applicable"}`);
  lines.push(`Pincode: ${options.pincode || "Please share for a delivery enquiry"}`);
  lines.push("", "Please confirm availability, the final price and courier charges for my location before finalizing the order.");
  lines.push("This message is an enquiry and does not confirm an order.");

  if (productUrl) lines.push(`Product URL: ${productUrl}`);
  else lines.push(`Website: ${siteConfig.canonicalUrl}`);

  return lines.join("\n");
}

export function cartWhatsAppUrl(items, subtotal, options) {
  return createWhatsAppUrl(createCartMessage(items, subtotal, options));
}

export function productWhatsAppUrl(product, quantity, productUrl, options) {
  return createWhatsAppUrl(createProductMessage(product, quantity, productUrl, options));
}
