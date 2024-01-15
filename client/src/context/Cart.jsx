
import { createContext, useContext, useState,useEffect } from 'react';

// Create your context
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  useEffect(()=>{
    let existingCart =localStorage.getItem("cart")
    if(existingCart) {
      setCart(JSON.parse(existingCart))
    }
  },[])

  // Your other cart-related logic goes here...

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
