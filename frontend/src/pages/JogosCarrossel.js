import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"; 
import api from "../services/api";
import { ToastContainer, toast } from 'react-toastify'; 
import getUserRole from '../utils/getUserRole';
import "./Home.css";

const JogosPage = () => {
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState(null);
  const { usuario, loading } = useContext(AuthContext);
  const primeiroNome = usuario?.nome.split(" ")[0];
  const userRole = getUserRole();

  // Função para buscar os jogos do backend
  const fetchJogos = async () => {
    try {
      const response = await api.get(`/jogos`, { withCredentials: true });
      setJogos(response.data);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
      setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
    }
  };

  // Atualiza os jogos quando o componente carrega
  useEffect(() => {
    fetchJogos();
  }, []);

  // Função de navegação para a página de compra
  const navigate = useNavigate();
  const goToCompra = (jogoId) => {
    navigate(`/compra/${jogoId}`, {
      state: { jogoId }, // Passa o ID do jogo para a próxima página
    });
  };

  // Função de navegação para painel de administração
  const goToAdmin = () => {
    navigate('/admin');
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <header className="header">
        <div className="logo">🎮 EpicPlay</div>
        <div className="auth-buttons">
          {usuario ? (
            <>
              <p>Olá, {primeiroNome}!</p>
              {userRole === 'admin' && (
                <button onClick={goToAdmin} className="nav-button">
                  Painel de Administração
                </button>
              )}
            </>
          ) : (
            <>
              <button className="auth-button" onClick={() => navigate('/login')}>Login</button>
              <button className="auth-button" onClick={() => navigate('/cadastro')}>Cadastro</button>
            </>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="main-content">
        {/* Lista de Jogos */}
        <div className="game-list">
          {erro ? (
            <p>{erro}</p>
          ) : jogos.length === 0 ? (
            <p>Nenhum jogo encontrado.</p>
          ) : (
            jogos.map((jogo) => (
              <div className="game-card" key={jogo.id}>
                <img
                  src={jogo.capa || "/images/placeholder.png"}
                  alt={jogo.nome}
                  className="game-cover"
                />
                <h2>{jogo.nome}</h2>
                <p>
                  {jogo.sinopse && jogo.sinopse.length > 80
                    ? `${jogo.sinopse.slice(0, 80)}...`
                    : jogo.sinopse || "Sinopse não disponível."}
                </p>
                <p className="price">R$ {parseFloat(jogo.preco || 0).toFixed(2)}</p>
                <button
                  className="buy-button"
                  onClick={() => goToCompra(jogo.id)} // Navega para a tela de compra com o ID do jogo
                >
                  Comprar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default JogosPage;
