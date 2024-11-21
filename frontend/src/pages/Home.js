import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api, { UPLOADS_URL } from "../services/api"; // Importa a URL de Uploads
import { ToastContainer, toast } from "react-toastify";
import getUserRole from "../utils/getUserRole";
import "./Home.css";

const Home = () => {
  const [jogos, setJogos] = useState([]);
  const [jogosFiltrados, setJogosFiltrados] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa
  const userRole = getUserRole();

  // Obtendo o usuário do contexto
  const { usuario, loading } = useContext(AuthContext);
  const primeiroNome = usuario?.nome.split(" ")[0];

  // Função para buscar os jogos do backend
  const fetchJogos = async () => {
    try {
      const response = await api.get(`/jogos`, { withCredentials: true });
      setJogos(response.data);
      setJogosFiltrados(response.data); // Inicializa com todos os jogos
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
      setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
    }
  };

  // Atualiza os jogos quando o componente carrega
  useEffect(() => {
    fetchJogos();
  }, []);

  // Função de navegação para a página do jogo
  const navigate = useNavigate();
  const goToGame = (jogoId) => {
    navigate(`/jogos/${jogoId}`, {
      state: { jogoId }, // Passa o ID do jogo para a próxima página
    });
  };

  // Função de filtro de busca
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
      {/* Cabeçalho */}
      <header className="header">
        <div className="logo">EpicPlay</div>

        {/* Barra de pesquisa com ícone */}
        <div className="search-container">
          <div className="group">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="icon"
            >
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
              <p>Olá, {primeiroNome}!</p>
              {userRole === "admin" && (
                <button onClick={() => navigate("/admin")} className="nav-button">
                  Painel de Administração
                </button>
              )}
            </>
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
        <Link to="/jogos-exemplo" className="nav-link">
          Jogos Gratuitos
        </Link>
        <Link to="/jogos-exemplo" className="nav-link">
          Jogos Destaques
        </Link>
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

      {/* Conteúdo Principal */}
      <div className="main-content">
        {/* Lista de Jogos */}
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
                  onClick={() => goToGame(jogo.id)} // Navega para a tela de compra com o ID do jogo
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

export default Home;
