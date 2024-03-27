import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom'
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/Auth'; 
import { CartProvider } from './context/Cart.jsx';
import { SearchProvider } from './context/search.jsx';
// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <React.StrictMode>
        {/* <ThemeProvider> */}
         <App />
        {/* </ThemeProvider> */}
        </React.StrictMode>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
