import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>
      <div className="admin-cards">
        {/* Card de Jogos */}
        <div className="admin-card">
          <h2>Área de Administração de Jogos</h2>
          <ul>
            <li>Adicione novos jogos</li>
            <li>Edite os jogos existentes</li>
            <li>Remova os jogos</li>
          </ul>
          <button className="admin-button" onClick={() => navigate('/admin/jogos')}>
            Gerenciar Jogos
          </button>
        </div>

        {/* Card de Empresas */}
        <div className="admin-card">
          <h2>Área de Administração de Empresas</h2>
          <ul>
            <li>Adicione novas empresas</li>
            <li>Edite informações das empresas</li>
            <li>Remova empresas cadastradas</li>
          </ul>
          <button className="admin-button" onClick={() => navigate('/admin/empresas')}>
            Gerenciar Empresas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
