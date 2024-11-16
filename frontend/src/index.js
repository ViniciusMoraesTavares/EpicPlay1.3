import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';

// Cria o root e renderiza o app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
