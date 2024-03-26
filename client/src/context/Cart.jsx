/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './Auth';
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch existing cart from local storage on component mount
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Update local storage with the latest cart data whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Other cart-related logic...

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
