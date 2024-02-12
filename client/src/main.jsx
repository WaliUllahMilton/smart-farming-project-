import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth' 
import { CartProvider } from './context/Cart.jsx'
// import { DataProvider } from './context/search.jsx'
import { SearchProvider } from './context/search.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
)
