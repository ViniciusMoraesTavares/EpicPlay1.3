import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'; // Página inicial
import Register from './pages/Register'; // Página de registro
import Login from './pages/Login'; // Página de login
import GamePage from './pages/GamePage'; // Página do jogo específico
import CompanyPage from './pages/empresa'; // Página da empresa
import MeuPerfilPage from './pages/MeuPerfilPage';
import Admin from './pages/admin'; // Página do painel de admin
import EmpresaCrud from './pages/EmpresaCrud'; // Tela de CRUD de empresas
import JogosCrud from './pages/JogosCrud'; // Tela de CRUD de jogos
import EditarEmpresa from './pages/EditarEmpresa'; // Tela editar empresa
import AdicionarEmpresa from './pages/AdicionarEmpresa'; // Tela adiconar nova empresa
import EditarJogo from './pages/EditarJogo'; // tela editar jogo
import AdicionarJogo from './pages/AdicionarJogo'; // Tela adiconar novo jogo
import Compra from './pages/compra'; // Tela de compra
import Confirmacao from './pages/confimacao' // Tela chave de ativação
import JogosCarrossel from './pages/JogosCarrossel';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jogos/:id" element={<GamePage />} />
            <Route path="/empresas/:id" element={<CompanyPage />} />
            <Route path="/perfil" element={<MeuPerfilPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/empresas" element={<EmpresaCrud />} />
            <Route path="/admin/jogos" element={<JogosCrud />} />
            <Route path="/empresas/editar/:id" element={<EditarEmpresa />} />
            <Route path="/admin/jogo/editar/:id" element={<EditarJogo />} />
            <Route path="/admin/empresa/adicionar" element={<AdicionarEmpresa />} />
            <Route path="/admin/jogo/adicionar" element={<AdicionarJogo />} />
            <Route path="/compra/:id" element={<Compra />} />
            <Route path="/confimacao/:id" element={<Confirmacao />} />
            <Route path="/jogos-exemplo" element={<JogosCarrossel />} />
          </Routes>
        </AuthProvider>
        <ToastContainer />
      </Router>
    </GoogleOAuthProvider> 
  );
}

export default App;
