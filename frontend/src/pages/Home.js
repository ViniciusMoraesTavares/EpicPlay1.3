import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importando o AuthContext
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Obtendo o usuário do contexto para verificar se está logado
  const { usuario } = useContext(AuthContext);
  console.log('Usuário atual:', usuario);

  // Função para buscar os jogos do backend
  const fetchJogos = async () => {
    try {
      const response = await api.get(`/jogos?search=${searchQuery}&genre=${selectedGenre}`, { withCredentials: true });
      setJogos(response.data);
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      setErro('Não foi possível carregar os jogos.');
    }
  };

  // Função para filtrar jogos por gênero
  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
  };

  useEffect(() => {
    fetchJogos();
  }, [searchQuery, selectedGenre]); // Recarrega os jogos quando searchQuery ou selectedGenre mudar

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addToCart = (jogo) => {
    // Função para adicionar o jogo ao carrinho
    console.log('Adicionando ao carrinho', jogo);
    // Aqui você pode adicionar lógica para atualizar o carrinho no backend ou contexto
  };

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <header className="header">
        <div className="logo">🎮 EpicPlay</div>
        <input
          type="text"
          placeholder="Pesquisar jogos..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="auth-buttons">
          {usuario ? (
            <p>Olá, {usuario.nome}</p>
          ) : (
            <>
              <Link to="/login">
                <button className="auth-button">Login</button>
              </Link>
              <Link to="/cadastro">
                <button className="auth-button">Cadastro</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Menu de Navegação */}
      <nav className="navigation">
        <Link to="/jogos-gratuitos" className="nav-link">Jogos Gratuitos</Link>
        <Link to="/jogos-destaques" className="nav-link">Jogos Destaques</Link>
        <Link to="/usuarios/" className="nav-link">Perfil</Link>
      </nav>

      <div className="main-content">
        {/* Filtros Laterais */}
        <aside className="sidebar">
          <h3>Gêneros</h3>
          <div className="filter-box">
            <ul>
              <li onClick={() => handleGenreFilter('graturos')}>Gratuitos para Jogar</li>
              <li onClick={() => handleGenreFilter('acao')}>Ação</li>
              <li onClick={() => handleGenreFilter('anime')}>Anime</li>
              <li onClick={() => handleGenreFilter('arcade')}>Arcade</li>
              <li onClick={() => handleGenreFilter('casuais')}>Casuais</li>
              <li onClick={() => handleGenreFilter('competitivo')}>Competitivo</li>
              <li onClick={() => handleGenreFilter('estrategia')}>Estratégia</li>
              <li onClick={() => handleGenreFilter('luta')}>Luta</li>
              <li onClick={() => handleGenreFilter('mundo-aberto')}>Mundo Aberto</li>
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
                <button className="buy-button" onClick={() => addToCart(jogo)}>
                  Adicionar ao carrinho
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
