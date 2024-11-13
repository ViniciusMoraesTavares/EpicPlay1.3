import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import CompanyPage from './pages/empresa'; 
import UserProfilePage from './pages/userProfilePage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jogos/:id" element={<GamePage />} /> 
        <Route path="/empresas/:id" element={<CompanyPage />} /> 
        <Route path="/usuarios/:id" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
