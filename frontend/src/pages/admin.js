import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCircleRemove, CiCirclePlus, CiEdit } from "react-icons/ci";
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add('admin');
    return () => {
      document.body.classList.remove('admin');
    };
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>
      <div className="admin-cards">
        <div className="admin-cardJogos">
          <h2>Área de Administração de Jogos</h2>
          <ul>
            <li><CiCirclePlus /> Adicione novos jogos</li>
            <li><CiEdit /> Edite os jogos existentes</li>
            <li><CiCircleRemove /> Remova os jogos</li>
          </ul>
          <button className="admin-button" onClick={() => navigate('/admin/jogos')}>
            Gerenciar Jogos
          </button>
        </div>
        <div className="admin-card">
          <h2>Área de Administração de Empresas</h2>
          <ul>
            <li><CiCirclePlus /> Adicione novas empresas</li>
            <li><CiEdit /> Edite as empresas existentes</li>
            <li><CiCircleRemove /> Remova empresas </li>
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


