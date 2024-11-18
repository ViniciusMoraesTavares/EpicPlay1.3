import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

      // Salva o token no localStorage
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchUserData(); // Recarrega os dados do usuário
      toast.success('Login realizado com sucesso!');
      return '/'; // Retorna a rota para redirecionamento
    } catch (err) {
      toast.error('Erro ao realizar login. Verifique suas credenciais.');
      console.error(err);
      throw err; // Permite ao chamador lidar com o erro
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchUserData();
      toast.success('Login com Google realizado com sucesso!');
      return '/'; // Retorna a rota para redirecionamento
    } catch (err) {
      toast.error('Erro ao realizar login com Google.');
      console.error(err);
      throw err; // Permite ao chamador lidar com o erro
    }
  };

  const handleGoogleLoginFailure = (error) => {
    toast.error('Falha ao realizar login com Google.');
    console.error(error);
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    setUsuario(null); // Limpa os dados do usuário
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
