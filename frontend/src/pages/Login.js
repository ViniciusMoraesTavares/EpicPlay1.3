import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const { usuario, loading, loginWithEmail, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  // Manipulação do background quando a página de login for renderizada
  useEffect(() => {
    // Defina o fundo específico para a página de login
    document.body.style.backgroundImage = "url('./uploads/fundo.jpg')"; // Caminho da imagem de fundo
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed'; // Para fixar o fundo enquanto rola a página
    
    // Limpeza ao sair da página de login
    return () => {
      document.body.style.backgroundImage = ''; // Remove o fundo ao sair
    };
  }, []); // O array vazio garante que o efeito aconteça apenas uma vez, quando o componente for montado

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
    <div className="login-container">
      {usuario ? (
        <div>
          <h3>Bem-vindo, {usuario.nome}</h3>
          <button className="button-confirm" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-title">
              Olá,<br /><span>Faça seu login!</span>
            </div>
            <input 
              className="login-input" 
              name="email" 
              placeholder="Email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              className="login-input" 
              name="senha" 
              placeholder="Senha" 
              type="password" 
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <div className="login-with">
              <div className="login-button-log">
                {/* Ícone do Facebook */}
                <svg xmlns="http://www.w3.org/2000/svg" width="56.6934px" viewBox="0 0 56.6934 56.6934" height="56.6934px">
                  <path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77L40.43,21.739z"></path>
                </svg>
              </div>
              
              <div className="login-button-log">
                {/* Ícone do Google */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="56.6934px" height="56.6934px">
                  <path fill="#4285F4" d="M23.49 12.3c0-.74-.07-1.46-.2-2.14H12v4.04h6.16c-.26-1.1-1.01-2-2.16-2z"></path>
                  <path fill="#34A853" d="M12 7.26c1.31 0 2.42.45 3.28 1.21L17.9 5.41C16.2 4.03 14.04 3 12 3 8.6 3 5.61 4.42 4.05 6.96l-3.08-1.8C2.74 3.26 7.48 1.5 12 1.5c2.47 0 4.67.83 6.46 2.2l-2.45 2.56c-.92-.63-2.07-1-3.01-1z"></path>
                  <path fill="#FBBC05" d="M8.05 6.96C7.56 5.88 8.21 4.59 9.16 4.2L9.17 4.19 9.11 4.11C9.51 3.76 9.88 3.34 9.88 3c-4.46 0-8.06-3.61-8.06-8.07 0-2.46.91-4.62 2.46-6.29 2.33-3.14 5.72-4.62 9.02-5.17z"></path>
                </svg>
              </div>
            </div>
            <button className="login-button-confirm" type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Login →'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;

