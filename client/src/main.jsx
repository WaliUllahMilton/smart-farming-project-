import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth' 
import { CartProvider } from './context/Cart.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </CartProvider>
  </AuthProvider>
)
