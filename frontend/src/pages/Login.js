import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await axios.post('http://localhost:5000/usuarios/login', formData);
      if (response.status === 200) {
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao fazer o login do usuário:', error);
      alert('Erro ao realizar o login. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Senha:</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Register;