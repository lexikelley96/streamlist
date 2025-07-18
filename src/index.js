import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="455977019690-fnrs2kidkovrmjnfjf2gsff5ifl69g2f.apps.googleusercontent.com">
    <React.StrictMode>
      <AuthProvider> 
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// Enable PWA
serviceWorkerRegistration.register();
reportWebVitals();
