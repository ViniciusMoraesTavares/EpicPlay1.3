import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './GamePage.css';

function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [companyData, setCompanyData] = useState(null); // Novo estado para armazenar dados da empresa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      console.log("ID do jogo:", id);
      try {
        const response = await axios.get(`/jogos/${id}`, {
          withCredentials: true, // Isso garante que cookies e credenciais sejam enviados
        });

        if (response.status === 200 && response.data) {
          console.log("Dados recebidos da API:", response.data);
          setGameData(response.data);
          setMainImage(response.data.img_1);

          // Agora buscar dados da empresa
          const companyResponse = await axios.get(`/empresas/${response.data.empresa_id}`);
          if (companyResponse.status === 200 && companyResponse.data) {
            setCompanyData(companyResponse.data);
          } else {
            console.error('Erro ao buscar dados da empresa:', companyResponse);
            setError('Erro ao carregar dados da empresa.');
          }

        } else {
          console.error('Resposta inesperada da API:', response);
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

  const handleAddToCart = () => {
    alert('Jogo adicionado ao carrinho!');
  };

  const handleChangeImage = (image) => {
    setMainImage(image);
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
          <p className="game-price">R$ {gameData.preco}</p>
          <button onClick={handleAddToCart} className="btn-add-to-cart">Adicionar ao Carrinho</button>

          {/* Exibição da Empresa */}
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
    </div>
  );
}

export default GamePage;


