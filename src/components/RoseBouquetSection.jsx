import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles } from "lucide-react";
import { roseBouquetPrices } from "../data/products";
import { getProductBySlug } from "../data/products";
import { siteConfig } from "../data/siteConfig";
import { createWhatsAppUrl } from "../utils/whatsapp";

export function RoseBouquetSection() {
  const roseProduct = getProductBySlug("handmade-rose-bouquet");
  const [customerName, setCustomerName] = useState("");
  const [roseCount, setRoseCount] = useState("1");
  const [bouquetSize, setBouquetSize] = useState("");
  const [wrapping, setWrapping] = useState("");
  const [budget, setBudget] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [pincode, setPincode] = useState("");

  const selectedPrice = roseBouquetPrices.find((option) => option.roses === Number(roseCount));
  const message = [
    `Hello ${siteConfig.brandName},`,
    "",
    "I would like to customize a handmade rose bouquet.",
    `Customer name: ${customerName || "Not provided"}`,
    `Rose count: ${roseCount}`,
    `Preferred bouquet size: ${bouquetSize || "Please suggest"}`,
    `Wrapping style: ${wrapping || "Please share options"}`,
    `Budget: ${budget || "Please suggest available options"}`,
    `Special message: ${specialMessage || "None"}`,
    `Pincode: ${pincode || "I will share"}`,
    "Please confirm the current price, availability and courier charges for my location.",
    "This message is an enquiry and does not confirm an order.",
    `Website: ${siteConfig.canonicalUrl}`,
  ].join("\n");

  return (
    <section className="section rose-collection-section" data-scroll-reveal aria-labelledby="rose-collection-title">
      <div className="rose-collection-copy">
        <p className="eyebrow">Handmade Collection</p>
        <h2 id="rose-collection-title">A bouquet made for their moment.</h2>
        <div className="rose-photo-panel">
          <img src={roseProduct.images[0]} alt="Handmade rose bouquet by SPR GIFTS.IN" width="736" height="1104" loading="lazy" decoding="async" />
        </div>
        <p>{siteConfig.roseBouquetDescription}</p>
        <div className="rose-collection-actions">
          <Link className="outline-button" to="/product/handmade-rose-bouquet">View Bouquet</Link>
          <button className="gold-button" type="button" onClick={() => document.getElementById("rose-customize-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
            <Sparkles size={17} /> Customize Your Bouquet
          </button>
        </div>
      </div>

      <div className="rose-collection-panel">
        <div className="rose-price-heading">
          <div><p className="eyebrow">Rose Count Guide</p><h3>Handmade rose bouquet prices</h3></div>
          <span>INR</span>
        </div>
        <div className="rose-price-grid">
          {roseBouquetPrices.map((option) => (
            <div className={`rose-price-item ${option.price === null ? "unconfirmed" : ""}`} key={option.roses}>
              <span>{option.roses} {option.roses === 1 ? "Rose" : "Roses"}</span>
              <strong>{option.price === null ? option.priceLabel : `₹${option.price}`}</strong>
            </div>
          ))}
        </div>
        <p className="rose-price-note">The 5-rose price is awaiting confirmation. Contact us for the confirmed price before ordering.</p>

        <form id="rose-customize-form" className="enquiry-form" onSubmit={(event) => event.preventDefault()}>
          <h3>Customize your bouquet</h3>
          <label>Customer name <span>(optional)</span>
            <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} autoComplete="name" placeholder="Your name" />
          </label>
          <label>Number of roses
            <select value={roseCount} onChange={(event) => setRoseCount(event.target.value)}>
              {roseBouquetPrices.map((option) => (
                <option value={option.roses} key={option.roses}>
                  {option.roses} {option.roses === 1 ? "Rose" : "Roses"} — {option.price === null ? "Price to confirm" : `₹${option.price}`}
                </option>
              ))}
            </select>
          </label>
          {selectedPrice?.price === null && <p className="field-note">Contact us for the confirmed 5-rose price.</p>}
          <div className="enquiry-fields two-column">
            <label>Preferred bouquet size
              <input value={bouquetSize} onChange={(event) => setBouquetSize(event.target.value)} placeholder="Any size or your preference" />
            </label>
            <label>Wrapping style
              <input value={wrapping} onChange={(event) => setWrapping(event.target.value)} placeholder="Your preferred style" />
            </label>
            <label>Custom budget
              <input value={budget} onChange={(event) => setBudget(event.target.value)} inputMode="decimal" placeholder="Enter a budget (optional)" />
            </label>
            <label>Pincode
              <input value={pincode} onChange={(event) => setPincode(event.target.value)} inputMode="numeric" autoComplete="postal-code" placeholder="For a delivery enquiry" />
            </label>
            <label className="field-span">Special message
              <textarea value={specialMessage} onChange={(event) => setSpecialMessage(event.target.value)} rows="2" placeholder="Optional message for the bouquet" />
            </label>
          </div>
          <a className="gold-button enquiry-submit" href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> WhatsApp Order Enquiry
          </a>
          <p className="form-note">Opening WhatsApp sends an enquiry only; the final price, availability and delivery charges are confirmed with you.</p>
        </form>
      </div>
    </section>
  );
}
