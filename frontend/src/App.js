import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext'; // Contexto de autenticação

import Home from './pages/Home'; // Página inicial
import Register from './pages/Register'; // Página de registro
import Login from './pages/Login'; // Página de login
import GamePage from './pages/GamePage'; // Página do jogo específico
import CompanyPage from './pages/empresa'; // Página da empresa
import UserProfilePage from './pages/userProfilePage'; // Página do perfil do usuário
import Carrinho from './pages/Carrinho'; // Página do carrinho

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        {/* O AuthProvider agora fica dentro do Router */}
        <AuthProvider> 
          <Routes>
            {/* Definindo as rotas para cada página da aplicação */}
            <Route path="/" element={<Home />} /> {/* Página inicial */}
            <Route path="/cadastro" element={<Register />} /> {/* Página de registro */}
            <Route path="/login" element={<Login />} /> {/* Página de login */}
            <Route path="/jogos/:id" element={<GamePage />} /> {/* Página do jogo específico */}
            <Route path="/empresas/:id" element={<CompanyPage />} /> {/* Página da empresa */}
            <Route path="/usuarios/:id" element={<UserProfilePage />} /> {/* Página do perfil do usuário */}
            <Route path="/carrinho" element={<Carrinho />} /> {/* Página do carrinho */}
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
