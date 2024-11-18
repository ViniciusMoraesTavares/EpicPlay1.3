import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

function Login() {
  const {
    usuario,
    loading,
    loginWithEmail,
    logout,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      await loginWithEmail(formData.email, formData.senha); // Chama a função do contexto
      navigate('/'); // Redireciona após login
    } catch (error) {
      console.error('Erro ao fazer o login do usuário:', error);
      setError('Erro ao realizar o login. Verifique suas credenciais.');
    }
  };

 
  return (
    <div className="register-container">
      <h2>Login</h2>
      {usuario ? (
        <div>
          <h3>Bem-vindo, {usuario.nome}</h3>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>

          {/* Login com Email e Senha */}
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