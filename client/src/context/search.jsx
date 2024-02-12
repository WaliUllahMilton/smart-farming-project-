/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useSearchData = () => {
  return useContext(CartContext);
};

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    // Fetch existing searchValue from local storage on component mount
    const existingSearchData = localStorage.getItem('searchData');
    if (existingSearchData) {
      setSearchValue(JSON.parse(existingSearchData));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Update local storage with the latest searchData data whenever the cart changes
    localStorage.setItem('searchData', JSON.stringify(searchValue));
  }, [searchValue]);

  // Other search-related logic...

  return (
    <CartContext.Provider value={[searchValue, setSearchValue]}>
      {children}
    </CartContext.Provider>
  );
};
