import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart_v1")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const addItem = (p) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found)
        return prev.map((x) =>
          x.id === p.id ? { ...x, qty: x.qty + 1 } : x
        );
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
    );

  const removeItem = (id) => setCart((prev) => prev.filter((x) => x.id !== id));
  const clear = () => setCart([]);
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateQty, removeItem, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
