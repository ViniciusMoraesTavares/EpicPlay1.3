import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento
import './RegisterForm.css';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nickname: '',
    senha: ''
  });

  const [error, setError] = useState(''); // Adicionar state para erro

  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpar erros anteriores

    try {
      // Enviar os dados para a rota de cadastro do backend
      const response = await axios.post('http://localhost:3000/usuarios/cadastro', formData);

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        
        // Redireciona para a página home após cadastro bem-sucedido
        navigate('/'); // Redireciona para a página home
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

      // Verifica se o erro é relacionado a nickname ou email já existente
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

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input 
          type="text" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />

        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>NickName:</label>
        <input 
          type="text" 
          name="nickname" 
          value={formData.nickname} 
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

        <button type="submit">Cadastrar</button>

        {/* Exibir erro, caso haja algum */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Register;

