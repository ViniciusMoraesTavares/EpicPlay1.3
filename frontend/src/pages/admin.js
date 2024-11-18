import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Painel Administrativo</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/admin/empresas')}>Gerenciar Empresas</button>
        <button onClick={() => navigate('/admin/jogos')}>Gerenciar Jogos</button>
      </div>
    </div>
  );
};

export default Admin;
