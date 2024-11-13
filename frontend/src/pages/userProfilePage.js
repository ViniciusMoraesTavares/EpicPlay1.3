// UserProfilePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; 
import './UserProfilePage.css';

function UserProfilePage() {
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/usuarios/pesquisar/${id}`);
        setUserData(response.data);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile-container">
      <h1>Perfil de {userData.nome}</h1>
      <p><strong>Nickname:</strong> {userData.nickname}</p>

      <section className="user-games">
        <h2>Jogos Comprados</h2>
        {userData.jogos && userData.jogos.length > 0 ? (
          <ul>
            {userData.jogos.map((jogo, index) => (
              <li key={index}>{jogo}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum jogo comprado.</p>
        )}
      </section>

      <section className="last-game">
        <h2>Último Jogo</h2>
        <p>{userData.ultimoJogo || 'Nenhum jogo encontrado'}</p>
      </section>

      <section className="user-friends">
        <h2>Amigos</h2>
        {userData.amigos && userData.amigos.length > 0 ? (
          <ul>
            {userData.amigos.map((amigo, index) => (
              <li key={index}>
                {amigo.nome} ({amigo.nickname})
              </li>
            ))}
          </ul>
        ) : (
          <p>Este usuário ainda não tem amigos.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfilePage;
