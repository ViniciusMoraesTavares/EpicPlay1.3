import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nickname: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar os dados para a rota de cadastro do backend
      const response = await axios.post('http://localhost:5000/usuarios/cadastro', formData);
      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>NickName:</label>
        <input type="nickname" name="nickname" value={formData.nickname} onChange={handleChange} required />

        <label>Senha:</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;