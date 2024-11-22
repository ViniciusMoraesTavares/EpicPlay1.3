import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api, { UPLOADS_URL } from "../services/api"; 
import { ToastContainer, toast } from "react-toastify";
import getUserRole from "../utils/getUserRole";
import "../styles/Home.css";

const Home = () => {
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
        <div className="logo">EpicPlay</div>
        <div className="search-container">
          <div className="group">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
              <g>
                <path
                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                ></path>
              </g>
            </svg>
            <input
              className="input"
              type="search"
              placeholder="Pesquisar jogos..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="auth-buttons">
          {usuario ? (
            <>
              <p className="greeting">Olá, {primeiroNome}!</p>
              {userRole === "admin" && (
                <div className="admin-button-container">
                  <button
                    onClick={() => navigate("/admin")}
                    className="admin-button"
                  >
                    Painel de Administração
                  </button>
                </div>
               )}
            </>
           ) : (
              <nav className="auth-nav">
                <button className="auth-button" onClick={() => navigate("/login")}>
                  Login
               </button>
                <button className="auth-button" onClick={() => navigate("/cadastro")}>
                  Cadastro
                </button>
              </nav>
            )}
          </div>
      </header>
      <nav className="navigation">
        <button
          className="nav-link"
          onClick={() => navigate("/jogos-exemplo")}
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
        <button
          className="nav-link"
          onClick={() => navigate("/sobre-nos")}
        >
          Sobre
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
      <footer>
        <div className="footer-bar"> 
          <p>&copy; EpicPlay 2024</p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Home;