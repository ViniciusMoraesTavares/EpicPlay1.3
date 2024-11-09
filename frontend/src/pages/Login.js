import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Para indicar se o login está em andamento

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);  // Inicia o carregamento

    try {
      // Verificação para ver se as credenciais estão corretas antes de enviar
      if (!formData.email || !formData.senha) {
        setError("Por favor, preencha ambos os campos de email e senha.");
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:3000/usuarios/login', formData);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Salva o token no localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura o header de autorização
        alert('Login realizado com sucesso!');
        window.location.href = 'http://localhost:3001/';  // Redireciona para a página home do backend
      } else {
        setError('Login falhou, verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer o login do usuário:', error);
      setError('Erro ao realizar o login. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleGoogleLogin = () => {
    // Redireciona para a rota correta do backend para login com Google
    window.location.href = 'http://localhost:3000/auth/google';  // A URL correta é '/auth/google' com o domínio e porta
  };
  

  return (
    <div className="register-container">
      <h2>Login</h2>
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

      {/* Botão de login com Google */}
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
    </div>
  );
}

export default Login;

