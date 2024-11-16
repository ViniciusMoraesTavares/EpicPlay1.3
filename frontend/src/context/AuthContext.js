import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(null); // Gerenciando o redirecionamento

  useEffect(() => {
    // Verificar se já existe um token no localStorage ao carregar a aplicação
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false); // Se não há token, podemos parar o carregamento
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/usuarios/me');
      setUsuario(response.data); // Atualiza o usuário no estado
    } catch (err) {
      setError('Erro ao carregar dados do usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email, senha) => {
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      const { token } = response.data;
      localStorage.setItem('token', token); // Salva o token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData(); // Recarrega os dados do usuário após o login
      setRedirect('/'); // Marca o redirecionamento para a página inicial
    } catch (err) {
      setError('Erro ao realizar login com email');
      console.error(err);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const token = response.credential; // O token do Google
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchUserData(); // Recarrega os dados do usuário após o login
    setRedirect('/'); // Marca o redirecionamento para a página inicial
  };

  const handleGoogleLoginFailure = (error) => {
    setError('Falha ao realizar login com Google');
    console.error(error);
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    setUsuario(null); // Limpa os dados do usuário
    setRedirect('/login'); // Marca o redirecionamento para a página de login
  };

  if (redirect) {
    return <Navigate to={redirect} />; // Realiza o redirecionamento
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        error,
        loginWithEmail,
        handleGoogleLoginSuccess,
        handleGoogleLoginFailure,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
