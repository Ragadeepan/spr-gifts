import { siteConfig } from "../data/siteConfig";

export function setSeo({
  title = "SPR GIFTS.IN | Online Gift Shop India | Gifts Made Special",
  description = "Shop Jhumki gift sets, handmade rose bouquets and custom chocolate gifts from SPR GIFTS.IN. Enquire on WhatsApp. Pan India delivery, subject to service availability and courier charges.",
  image = siteConfig.logo,
  path = "/",
  type = "website",
} = {}) {
  document.title = title;
  setMeta("description", description);
  setMeta("og:title", title, "property");
  setMeta("og:description", description, "property");
  setMeta("og:type", type, "property");
  setMeta("og:image", absoluteUrl(image), "property");
  setMeta("og:url", absoluteUrl(path), "property");
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", absoluteUrl(image));

  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = absoluteUrl(path);
}

export function addJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.canonicalUrl,
    logo: absoluteUrl(siteConfig.logo),
    sameAs: [siteConfig.instagramUrl],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsappNumber}`,
      contactType: "customer service",
      areaServed: "IN",
    },
  };
}

export function productJsonLd(product, categoryName) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code || product.id,
    category: categoryName,
    description: product.description,
    image: product.images?.map(absoluteUrl),
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName,
    },
  };

  if (product.price !== null && product.price !== undefined) {
    data.offers = {
      "@type": "Offer",
      priceCurrency: product.currency || siteConfig.currency,
      price: product.price,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/product/${product.slug}`),
    };
  }

  return data;
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function setMeta(name, content, attr = "name") {
  let tag = document.querySelector(`meta[${attr}='${name}']`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function absoluteUrl(path) {
  if (!path) return siteConfig.canonicalUrl;
  if (path.startsWith("http")) return path;
  return `${siteConfig.canonicalUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
