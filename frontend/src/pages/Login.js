import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

function Login() {
  const { usuario, loading, handleGoogleLoginSuccess, handleGoogleLoginFailure, loginWithEmail, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para navegação

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.senha) {
      setError('Por favor, preencha ambos os campos de email e senha.');
      return;
    }

    // Validação simples do formato de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await api.post('/usuarios/login', formData);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Salva o token no localStorage
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura o header de autorização
        alert('Login realizado com sucesso!');
        navigate('/');  // Redireciona para a página home
      } else {
        setError('Login falhou, verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer o login do usuário:', error);
      setError('Erro ao realizar o login. Tente novamente.');
    }
  };

  const handleGoogleLogin = (response) => {
    // Chama a função que lida com o login via Google, já fornecida no contexto
    handleGoogleLoginSuccess(response);
    navigate('/');  // Redireciona após login com sucesso
  };

  const handleGoogleLoginError = (error) => {
    handleGoogleLoginFailure(error);
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      {usuario ? (
        <div>
          <h3>Bem-vindo, {usuario.nome}</h3> {/* Verifique se "nome" está correto */}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          {/* Login com Google */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLoginError}
            useOneTap
          />
          <hr />

          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Entrar'}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
