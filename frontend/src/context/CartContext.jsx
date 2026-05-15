import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bnj_cart") || "[]");
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bnj_wishlist") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("bnj_cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("bnj_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += qty;
        return next;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, quantity: qty }];
    });
  };
  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id, qty) => setItems((prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, qty) } : p));
  const clear = () => setItems([]);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => prev.includes(productId) ? prev.filter((x) => x !== productId) : [...prev, productId]);
  };
  const inWishlist = (id) => wishlist.includes(id);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, subtotal, count: items.reduce((s,i)=>s+i.quantity,0), wishlist, toggleWishlist, inWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
