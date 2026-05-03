import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
  setCartItems(prev => {
    const existing = prev.find(item => item.id === product.id);
    const currentQty = existing ? existing.quantity : 0;
    const totalRequested = currentQty + quantity;

    // Проверка на превышение остатка
    if (totalRequested > product.stock) {
      alert(`Нельзя добавить больше, чем есть на складе (${product.stock} шт.)`);
      return prev; // возвращаем неизменённое состояние
    }

    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: totalRequested }
          : item
      );
    }
    return [...prev, { ...product, quantity }];
  });
};

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, total, itemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}