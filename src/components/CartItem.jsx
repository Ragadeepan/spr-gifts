import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

export function CartItem({ item, increase, decrease, remove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} width="88" height="88" loading="lazy" />
      <div>
        <h3>{item.name}</h3>
        <p>{formatPrice(item.price)}</p>
        <div className="quantity-row" aria-label={`Quantity for ${item.name}`}>
          <button type="button" onClick={() => decrease(item.id)} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => increase(item.id)} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
          <button type="button" onClick={() => remove(item.id)} aria-label="Remove item" style={{ marginLeft: 4 }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}