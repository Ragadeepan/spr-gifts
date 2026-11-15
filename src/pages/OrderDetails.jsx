import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { createWhatsAppUrl } from "../utils/whatsapp";
import { getBouquetOrderName, isBouquetOrderProduct } from "../utils/bouquetOrder";
import { setSeo } from "../utils/seo";

const sizes = ["Small", "Medium", "Big"];

export function OrderDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const productName = getBouquetOrderName(product);
  const [size, setSize] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSeo({
      title: `${productName || "Order Details"} | SPR GIFTS.IN`,
      description: `Choose a size and budget for ${productName || "your bouquet"}, then continue to WhatsApp.`,
      path: `/order-details/${slug}`,
    });
  }, [productName, slug]);

  if (!isBouquetOrderProduct(product)) {
    return (
      <section className="page section center-page">
        <p className="eyebrow">Order details</p>
        <h1>Product not found</h1>
        <p>This order form is available for Chocolate Bouquet and Customized Rose Bouquet.</p>
        <Link className="gold-button" to="/shop">Back to Shop</Link>
      </section>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!sizes.includes(size)) {
      setError("Please select a bouquet size to continue.");
      return;
    }

    const normalizedBudget = budget.trim();
    const numericBudget = Number(normalizedBudget);
    if (!/^(?:\d+\.?\d*|\.\d+)$/.test(normalizedBudget) || !Number.isFinite(numericBudget) || numericBudget <= 0) {
      setError("Please enter a valid budget greater than ₹0.");
      return;
    }

    setError("");
    const message = [
      "Hello SPR GIFTS.IN!",
      "",
      "I would like to order a bouquet.",
      "",
      `Product: ${productName}`,
      `Size: ${size}`,
      `My Budget: ₹${normalizedBudget}`,
      "",
      "Please share the available options and details.",
      "",
      "Thank you!",
    ].join("\n");
    window.location.assign(createWhatsAppUrl(message));
  };

  return (
    <section className="page section bouquet-order-page">
      <div className="bouquet-order-card">
        <p className="eyebrow">Personalize your order</p>
        <h1>{productName}</h1>
        <p className="bouquet-order-intro">Choose a size and enter your budget. We’ll share the available options with you on WhatsApp.</p>

        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="bouquet-size-fieldset" aria-required="true">
            <legend>Select Bouquet Size <span className="required-mark">Required</span></legend>
            <div className="bouquet-size-options">
              {sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`bouquet-size-option ${size === option ? "selected" : ""}`}
                  aria-pressed={size === option}
                  onClick={() => { setSize(option); setError(""); }}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="bouquet-budget-field">
            Select Your Budget <span className="required-mark">Required</span>
            <span className="bouquet-budget-input-wrap">
              <span aria-hidden="true">₹</span>
              <input
                type="number"
                min="0.01"
                step="any"
                inputMode="decimal"
                required
                value={budget}
                onChange={(event) => { setBudget(event.target.value); setError(""); }}
                placeholder="Type your budget (₹)"
                aria-invalid={Boolean(error)}
                aria-required="true"
                aria-describedby={error ? "bouquet-order-error" : undefined}
              />
            </span>
          </label>

          {error && <p id="bouquet-order-error" className="bouquet-order-error" role="alert">{error}</p>}

          <button className="gold-button bouquet-whatsapp-button" type="submit">Go to WhatsApp</button>
          <p className="bouquet-order-note">WhatsApp opens an enquiry to {siteConfig.brandName}; the order is not confirmed until details are agreed.</p>
        </form>
      </div>
    </section>
  );
}
