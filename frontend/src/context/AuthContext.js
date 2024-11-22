import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider para gerenciar o estado e lógica de autenticação
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toggle, setToggle] = useState(false); 

  // Verifica se existe um token ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  // Função para buscar dados do usuário
  const fetchUserData = async () => {
    try {
      const response = await api.get('/usuarios/me');
      setUsuario(response.data);
    } catch (err) {
      setError('Erro ao carregar dados do usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para login com email e senha
  const loginWithEmail = async (email, senha) => {
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchUserData(); 
      toast.success('Login realizado com sucesso!');
      return '/'; 
    } catch (err) {
      toast.error('Erro ao realizar login. Verifique suas credenciais.');
      console.error(err);
      throw err; 
    }
  };

  // Função para login com o Google (sem funcinalidade)
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchUserData();
      toast.success('Login com Google realizado com sucesso!');
      return '/'; 
    } catch (err) {
      toast.error('Erro ao realizar login com Google.');
      console.error(err);
      throw err; 
    }
  };

  // Função para falha no login com o Google (nao funciona)
  const handleGoogleLoginFailure = (error) => {
    toast.error('Falha ao realizar login com Google.');
    console.error(error);
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    setUsuario(null);
    toast.info('Você saiu da sua conta.');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        error,
        loginWithEmail,
        handleGoogleLoginSuccess,
        handleGoogleLoginFailure,
        logout,
        fetchUserData,
        setLoading,
        toggle,
        setToggle, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};