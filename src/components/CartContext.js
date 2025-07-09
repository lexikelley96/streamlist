// File: src/components/CartContext.js
import React, { createContext, useState, useEffect, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Determine if the item is a subscription
  const isSubscription = (item) => item.service?.toLowerCase().includes('subscription');

  // Add item to cart
  const addToCart = (item) => {
    if (isSubscription(item)) {
      const alreadyHasSubscription = cart.some(isSubscription);
      if (alreadyHasSubscription) {
        return { success: false, message: 'Only one subscription allowed in cart.' };
      }
    }

    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }

    return { success: true };
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
