import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import CompanyPage from './pages/empresa'; // Importe o novo componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home será a página principal do seu frontend */}
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jogos/:id" element={<GamePage />} /> {/* Rota dinâmica para GamePage */}
        <Route path="/empresas/:id" element={<CompanyPage />} /> {/* Nova Rota para CompanyPage */}
      </Routes>
    </Router>
  );
}

export default App;

