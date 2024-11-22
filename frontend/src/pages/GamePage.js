import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import api from '../services/api';
import './GamePage.css';

function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchGameData = async () => {
      console.log("ID do jogo:", id);
      try {
        const gameResponse = await api.get(`/jogos/${id}`);
        if (gameResponse.status === 200 && gameResponse.data) {
          const game = gameResponse.data;
          game.capa = `${api.defaults.baseURL}/${game.capa}`;
          game.img_1 = game.img_1 ? `${api.defaults.baseURL}/${game.img_1}` : null;
          game.img_2 = game.img_2 ? `${api.defaults.baseURL}/${game.img_2}` : null;
          game.img_3 = game.img_3 ? `${api.defaults.baseURL}/${game.img_3}` : null;
          game.img_4 = game.img_4 ? `${api.defaults.baseURL}/${game.img_4}` : null;

          setGameData(game);

          const companyId = game.empresa_id;
          const companyResponse = await api.get(`/empresas/${companyId}`);
          if (companyResponse.status === 200 && companyResponse.data) {
            setCompanyData(companyResponse.data);
          } else {
            console.error('Empresa não encontrada para o ID:', companyId);
            setError('Erro ao carregar dados da empresa.');
          }
        } else {
          console.error('Resposta inesperada da API:', gameResponse);
          setError('Erro ao carregar os dados do jogo.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do jogo:', error);
        setError('Erro ao conectar com a API. Verifique a conexão.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameData();
    } else {
      setLoading(false);
      setError('ID do jogo não encontrado.');
    }
  }, [id]);

  const handleCompra = () => {
    navigate(`/compra/${id}`);
  };

  const handleChangeImage = (image) => {
    setMainImage(image);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
  
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([\w-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return null;
  };
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!gameData) return <p>Erro ao carregar dados do jogo.</p>;

  return (
    <div className="game-container">
      <div className="game-header">
        <img src={gameData.capa} alt="Capa do Jogo" className="game-cover" />
        <div className="game-info">
          <h1>{gameData.nome}</h1>
          <p className="game-description">{gameData.descricao}</p>
          <p className="game-gender">{gameData.genero}</p>
          <p className="game-price">R$ {gameData.preco}</p>
          <button onClick={handleCompra} className="btn-add-to-cart">Comprar</button>

          {companyData && (
            <div className="company-info">
              <h3>Desenvolvido por:</h3>
              <Link to={`/empresas/${companyData.id}`} className="company-link">
                {companyData.nome}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Sinopse */}
      <section className="game-synopsis">
        <h2>Sinopse</h2>
        <p>{gameData.sinopse}</p>
      </section>

      {/* Trailer */}
      {gameData.trailer && (
        <section className="game-trailer">
        <h2>Trailer</h2>
        <div className="video-container">
          <iframe
            width="100%"
            height="400"
            src={getEmbedUrl(gameData.trailer)}
            title={`Trailer de ${gameData.nome}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      
      )}

      {/* Galeria de imagens */}
      <section className="gallery">
        <h2>Fotos do jogo</h2>
        <div className="main-image">
          <img src={mainImage || gameData.capa} alt="Imagem Principal" />
        </div>
        <div className="thumbnail-container">
          {gameData.img_1 && (
            <img
              src={gameData.img_1}
              alt="Miniatura 1"
              onClick={() => handleChangeImage(gameData.img_1)}
            />
          )}
          {gameData.img_2 && (
            <img
              src={gameData.img_2}
              alt="Miniatura 2"
              onClick={() => handleChangeImage(gameData.img_2)}
            />
          )}
          {gameData.img_3 && (
            <img
              src={gameData.img_3}
              alt="Miniatura 3"
              onClick={() => handleChangeImage(gameData.img_3)}
            />
          )}
          {gameData.img_4 && (
            <img
              src={gameData.img_4}
              alt="Miniatura 4"
              onClick={() => handleChangeImage(gameData.img_4)}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default GamePage;
