import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { cartWhatsAppUrl } from "../utils/whatsapp";
import { CartItem } from "./CartItem";

export function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, increase, decrease, remove, clear } = useCart();

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
          <div className="empty-state">Your cart is empty. Add a gift to request it on WhatsApp.</div>
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
            <a className="gold-button full" href={cartWhatsAppUrl(items, subtotal)} target="_blank" rel="noreferrer">
              Order Cart on WhatsApp
            </a>
            <button className="text-button" type="button" onClick={clear}>
              Clear cart
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
