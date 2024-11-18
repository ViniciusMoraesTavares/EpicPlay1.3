import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
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

  // Função de navegação para a página de compra
  const navigate = useNavigate();
  const goToCompra = (jogoId) => {
    navigate(`/compra/${jogoId}`, {
      state: { jogoId }, // Passa o ID do jogo para a próxima página
    });
  };

  // Função de navegação para painel de administração
  const goToAdmin = () => {
    navigate("/admin");
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
        <div className="logo">EpicPlay</div> {/* Apenas o nome do site no cabeçalho */}

        {/* Barra de pesquisa */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar jogos..."
            className="search-bar"
            value={searchQuery}
            onChange={handleSearch} // Chama a função de busca ao digitar
          />
        </div>

        <div className="auth-buttons">
          {usuario ? (
            <>
              <p>Olá, {primeiroNome}!</p>
              {userRole === "admin" && (
                <button onClick={goToAdmin} className="nav-button">
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
                  src={jogo.capa}
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

export default Home;
