import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { cartWhatsAppUrl } from "../utils/whatsapp";
import { CartItem } from "./CartItem";

export function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, increase, decrease, remove, clear } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [pincode, setPincode] = useState("");
  const [customization, setCustomization] = useState("");

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isCartOpen, closeCart]);

  return (
    <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`} aria-hidden={!isCartOpen}>
      <div className="cart-backdrop" onClick={closeCart} />
      <div className="cart-panel" role="dialog" aria-modal="true" aria-label="Gift cart">
        <div className="drawer-head">
          <div>
            <p>Your Selection</p>
            <h2>Gift Cart</h2>
          </div>
          <button type="button" onClick={closeCart} aria-label="Close cart">
            <X />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            Your cart is empty.
            <br />Add a gift to request it on WhatsApp.
            <Link className="gold-button full" to="/shop" onClick={closeCart}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  increase={increase}
                  decrease={decrease}
                  remove={remove}
                />
              ))}
            </div>
            <div className="cart-summary">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="cart-delivery-note">
              Delivery charge depends on your location and will be confirmed before the order is finalized.
            </p>
            <div className="cart-enquiry-fields">
              <label>Your name <span>(optional)</span>
                <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} autoComplete="name" placeholder="Name" />
              </label>
              <label>Delivery pincode
                <input value={pincode} onChange={(event) => setPincode(event.target.value)} inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="Pincode" />
              </label>
              <label>Gift notes or customization <span>(optional)</span>
                <textarea value={customization} onChange={(event) => setCustomization(event.target.value)} rows="2" placeholder="Gift preferences or message" />
              </label>
            </div>
            <a className="gold-button full" href={cartWhatsAppUrl(items, subtotal, { customerName, pincode, customization })} target="_blank" rel="noreferrer">
              Order Cart on WhatsApp
            </a>
            <Link className="outline-button full" to="/shop" onClick={closeCart}>
              Continue Shopping
            </Link>
            <button className="text-button" type="button" onClick={clear}>
              Clear cart
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
