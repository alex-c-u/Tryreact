import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <BrowserRouter>
   <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>

)
