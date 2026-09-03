import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const storageKey = "spr-gifts-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const addToCart = (product, quantity = 1) => {
    if (!product.available) return;

    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images?.[0] || "/images/products/product-placeholder.svg",
        },
      ];
    });
    setCartOpen(true);
  };

  const increase = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const remove = (id) =>
    setItems((current) => current.filter((item) => item.id !== id));

  const clear = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        count,
        isCartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        addToCart,
        increase,
        decrease,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
