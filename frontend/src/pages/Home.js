import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState(null);

  // Função para buscar os jogos do backend
  const fetchJogos = async () => {
    try {
      const response = await api.get('/jogos', {
        withCredentials: true, 
      });
      setJogos(response.data);
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      setErro('Não foi possível carregar os jogos.');
    }
  };

  useEffect(() => {
    fetchJogos();
  }, []);

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <header className="header">
        <div className="logo">🎮 EpicPlay</div>
        <input type="text" placeholder="Pesquisar jogos..." className="search-bar" />
        <button className="settings-button">⚙️</button>
      </header>

      {/* Menu de Navegação */}
      <nav className="navigation">
        <a href="#">Jogos Gratuitos</a>
        <a href="#">Jogos Destaques</a>
        <a href="#">Perfil</a>
      </nav>

      <div className="main-content">
        {/* Filtros Laterais */}
        <aside className="sidebar">
          <h3>Gêneros</h3>
          <div className="filter-box">
            <ul>
              <li>Gratuitos para Jogar</li>
              <li>Ação</li>
              <li>Anime</li>
              <li>Arcade</li>
              <li>Casuais</li>
              <li>Competitivo</li>
              <li>Estratégia</li>
              <li>Luta</li>
              <li>Mundo Aberto</li>
            </ul>
          </div>
          <div className="friend-search-container">
            <input type="text" placeholder="Pesquisar amigos..." className="friend-search" />
            <button className="search-button">🔍</button>
          </div>
        </aside>

        {/* Lista de Jogos */}
        <div className="game-list">
          {erro ? (
            <p>{erro}</p>
          ) : (
            jogos.map((jogo) => (
              <div className="game-card" key={jogo.id}>
                <img src={jogo.capa} alt={jogo.nome} className="game-cover" />
                <h2>{jogo.nome}</h2>
                <p>{jogo.sinopse}</p>
                <p className="price">R$ {jogo.preco}</p>
                <button className="buy-button">Comprar</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
