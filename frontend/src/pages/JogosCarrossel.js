import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api, { UPLOADS_URL } from "../services/api"; 
import { ToastContainer, toast } from "react-toastify";
import getUserRole from "../utils/getUserRole";
import "../styles/Home.css";

const JogosPage = () => {
  const [jogos, setJogos] = useState([]);
  const [jogosFiltrados, setJogosFiltrados] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const userRole = getUserRole();
  const { usuario, loading } = useContext(AuthContext);
  const primeiroNome = usuario?.nome.split(" ")[0];
  const fetchJogos = async () => {
    try {
      const response = await api.get("/jogos", { withCredentials: true });
      setJogos(response.data);
      setJogosFiltrados(response.data); 
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
      setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchJogos();
  }, []);

  const navigate = useNavigate();
  const goToGame = (jogoId) => {
    navigate(`/jogos/${jogoId}`, {
      state: { jogoId }, 
    });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredJogos = jogos.filter((jogo) =>
      jogo.nome.toLowerCase().includes(query)
    );
    setJogosFiltrados(filteredJogos);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Jogos em destaques</div>
      </header>
      <nav className="navigation">
      <button
          className="nav-link"
          onClick={() => navigate("/jogos-exemplo")}
        >
          Jogos Gratuitos
        </button>
        <button
          className="nav-link"
          onClick={() => navigate("/jogos-destaques")}
        >
          Jogos Destaques
        </button>
        <button
          className="nav-link"
          onClick={() => {
            if (usuario) {
              navigate("/perfil");
            } else {
              toast.error("Você precisa estar logado para acessar o perfil.");
              navigate("/login");
            }
          }}
        >
          Perfil
        </button>
      </nav>
      <div className="main-content">
        <div className="game-list">
          {erro ? (
            <p>{erro}</p>
          ) : jogosFiltrados.length === 0 ? (
            <p>Nenhum jogo encontrado para a pesquisa: "{searchQuery}".</p>
          ) : (
            jogosFiltrados.map((jogo) => (
              <div className="game-card" key={jogo.id}>
                <img
                  src={`${api.defaults.baseURL}${UPLOADS_URL}${jogo.capa}`}
                  alt={jogo.nome}
                  className="game-cover"
                />
                <h2>{jogo.nome}</h2>
                <p>
                  {jogo.sinopse && jogo.sinopse.length > 50
                    ? `${jogo.sinopse.slice(0, 50)}...`
                    : jogo.sinopse || "Sinopse não disponível."}
                </p>
                <p className="price">R$ {parseFloat(jogo.preco || 0).toFixed(2)}</p>
                <button
                  className="buy-button"
                  onClick={() => goToGame(jogo.id)} 
                >
                  Ver Mais
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