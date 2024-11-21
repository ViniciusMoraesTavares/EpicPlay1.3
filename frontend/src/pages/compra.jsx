import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Compra.css';

function Compra() {
  const { id } = useParams(); // ID do jogo
  const [gameData, setGameData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameResponse = await api.get(`/jogos/${id}`);
        if (gameResponse.status === 200 && gameResponse.data) {
          setGameData(gameResponse.data);
        } else {
          setError('Erro ao carregar os dados do jogo.');
        }
      } catch (error) {
        setError('Erro ao conectar com a API.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameData();
    }
  }, [id]);

  const handlePayment = () => {
    if (gameData) {
      navigate(`/confimacao/${id}`, { 
        state: { gameData, paymentMethod },
      });
    }
  };
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!gameData) return <p>Erro ao carregar dados do jogo.</p>;

  return (
    <div className="compra-form">
      <h1>{gameData.nome}</h1>
      <div className="game-info">
        <img src={gameData.capa} alt="Capa do Jogo" className="game-cover" />
        <p>Preço: R$ {gameData.preco}</p>
        <div>
          <h3>Selecione o método de pagamento:</h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Escolha um método</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="pix">Pix</option>
            <option value="boleto">Boleto</option>
          </select>
        </div>
        <button onClick={handlePayment} disabled={!paymentMethod} className="btn-pagar">
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}

export default Compra;

