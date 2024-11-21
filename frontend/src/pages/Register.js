import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // Importando o Link
import './RegisterForm.css';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nickname: '',
    senha: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/usuarios/cadastro', formData);

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('nickname')) {
          setError('Este nickname já está sendo usado. Tente outro.');
        } else if (errorMessage.includes('email')) {
          setError('Este email já está sendo usado. Tente outro.');
        } else {
          setError('Erro ao realizar cadastro. Tente novamente.');
        }
      } else {
        setError('Erro ao realizar cadastro. Tente novamente.');
      }
    }
  };

  useEffect(() => {
    // Adiciona a classe 'cadastro-page' no body
    document.body.classList.add('cadastro-page');

    // Remove a classe quando o componente for desmontado
    return () => {
      document.body.classList.remove('cadastro-page');
    };
  }, []);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-title">
          Bem-vindo!<br /><span>Faça seu cadastro!</span>
        </div>

        {/* Campo Nome */}
        <input 
          className="register-input" 
          name="nome" 
          placeholder="Nome" 
          type="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />

        {/* Campo Nickname */}
        <input 
          className="register-input" 
          name="nickname" 
          placeholder="Nickname" 
          type="nickname" 
          value={formData.nickname} 
          onChange={handleChange} 
          required 
        />

        {/* Campo Email */}
        <input 
          className="register-input" 
          name="email" 
          placeholder="Email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        {/* Campo Senha */}
        <input 
          className="register-input" 
          name="senha" 
          placeholder="Senha" 
          type="password" 
          value={formData.senha} 
          onChange={handleChange} 
          required 
        />

        {/* Ícones e Botões */}
        <div className="register-login-with">
          <div className="register-button-log"><b>t</b></div>
          <div className="register-button-log">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56.6934px"
              height="56.6934px"
              viewBox="0 0 56.6934 56.6934"
              className="register-icon"
            >
              <path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017 c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139 c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649 c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805 c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294 c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196 c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372 C14.7889,7.8907,9.6815,12.3763,6.8497,18.0459c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836 C3.6238,29.5732,4.382,35.2707,6.8468,40.1378c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078 c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138 C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z"></path>
            </svg>
          </div>
        </div>

        {/* Botão de Cadastro */}
        <button className="register-button-confirm">Cadastro→</button>

        {/* Exibe erro, se houver */}
        {error && <p className="register-error-message">{error}</p>}

        {/* Link para Login */}
        <div className="register-login-link">
          <span>Já tem uma conta? </span>
          <a href="/login" className="register-login-btn">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Register;



