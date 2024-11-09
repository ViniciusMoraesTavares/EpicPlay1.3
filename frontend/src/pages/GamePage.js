import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './GamePage.css';

function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      console.log("ID do jogo:", id); // Verifica se o ID está correto
      try {
        const response = await axios.get(`http://localhost:3000/jogos/${id}`);
        
        if (response.status === 200) {
          setGameData(response.data);
          setMainImage(response.data.img_1);
        } else {
          console.error('Erro na resposta da API:', response);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do jogo:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameData();
    }
  }, [id]);

  const handleAddToCart = () => {
    alert('Jogo adicionado ao carrinho!');
  };

  const handleChangeImage = (image) => {
    setMainImage(image);
  };

  if (loading) return <p>Carregando...</p>;
  if (!gameData) return <p>Erro ao carregar dados do jogo.</p>;

  return (
    <div className="game-container">
      <div className="game-header">
        <img src={gameData.capa} alt="Capa do Jogo" className="game-cover" />
        <div className="game-info">
          <h1>{gameData.nome}</h1>
          <p className="game-description">{gameData.descricao}</p>
          <p className="game-price">R$ {gameData.preco}</p>
          <button onClick={handleAddToCart} className="btn-add-to-cart">Adicionar ao Carrinho</button>
        </div>
      </div>

      <section className="gallery">
        <h2>Capturas de Tela</h2>
        <div className="main-image">
          <img src={mainImage} alt="Imagem Principal" />
        </div>
        <div className="thumbnails">
          <img src={gameData.img_1} alt="Miniatura 1" onClick={() => handleChangeImage(gameData.img_1)} />
          <img src={gameData.img_2} alt="Miniatura 2" onClick={() => handleChangeImage(gameData.img_2)} />
          <img src={gameData.img_3} alt="Miniatura 3" onClick={() => handleChangeImage(gameData.img_3)} />
        </div>
      </section>

      <section className="trailer">
        <h2>Trailer</h2>
        <video controls width="600">
          <source src={gameData.trailer} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </section>

      <section className="system-requirements">
        <h2>Requisitos do Sistema</h2>
        <ul>
          <li>SO: {gameData.so}</li>
          <li>Processador: {gameData.processador}</li>
          <li>Memória: {gameData.memoria} GB de RAM</li>
          <li>Gráficos: {gameData.graficos}</li>
          <li>Armazenamento: {gameData.armazenamento} GB de espaço disponível</li>
        </ul>
      </section>
    </div>
  );
}

export default GamePage;
