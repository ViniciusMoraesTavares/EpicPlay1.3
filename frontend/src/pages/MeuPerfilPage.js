import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fotoUser from "../assets/imgs/fotoUser.png";
import { FaEnvelope, FaFacebook, FaGithub } from "react-icons/fa"; //exemplo
import "./MeuPerfilPage.css";

const MeuPerfilPage = () => {
  const { logout } = useContext(AuthContext);
  const [meuPerfil, setMeuPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nickname: "",
    foto: null, 
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("perfil");

    return () => {
      document.body.classList.remove("perfil");
    };
  }, []);

  useEffect(() => {
    const fetchMeuPerfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Você não está autenticado. Faça login novamente.");
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/usuarios/me", { withCredentials: true });
        const perfil = response.data;
        const fotoUrl = perfil.foto ? `${api.defaults.baseURL}/${perfil.foto}` : null;

        setMeuPerfil({ ...perfil, foto: fotoUrl });
        setFormData({
          nome: perfil.nome,
          email: perfil.email,
          nickname: perfil.nickname,
          foto: fotoUrl, 
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar seu perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeuPerfil();
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, foto: file }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nome", formData.nome);
    data.append("email", formData.email);
    data.append("nickname", formData.nickname);
    if (formData.foto instanceof File) {
      data.append("foto", formData.foto); 
    }

    try {
      const response = await api.put("/usuarios/me", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      const perfilAtualizado = response.data;
      const fotoUrl = perfilAtualizado.foto
        ? `${api.defaults.baseURL}/${perfilAtualizado.foto}`
        : null;

      setMeuPerfil({ ...perfilAtualizado, foto: fotoUrl });
      setFormData({
        nome: perfilAtualizado.nome,
        email: perfilAtualizado.email,
        nickname: perfilAtualizado.nickname,
        foto: fotoUrl,
      });
      setEditMode(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando seu perfil...</p>
      </div>
    );
  }

  if (!meuPerfil) {
    return (
      <div className="error-container">
        <p>Erro ao carregar os detalhes do perfil. Tente novamente mais tarde.</p>
        <button onClick={() => navigate("/login")}>Ir para Login</button>
      </div>
    );
  }

  return (
    <div className="meu-perfil-container">
      <h1>{meuPerfil.nickname}</h1>
      <div className="perfil-card">
        <div className="card">
          <button className="mail">
            <FaEnvelope />
          </button>
          <div className="profile-pic">
            <img
              src={meuPerfil.foto || fotoUser}
              alt={`${meuPerfil.nome} Foto de Perfil`}
              className="perfil-foto"
            />
          </div>
          <div className="bottom">
            <div className="content">
              <span className="name">{meuPerfil.nome}</span>
              <span className="about-me">{meuPerfil.email}</span>
            </div>
            <div className="bottom-bottom">
              <button className="button" onClick={handleEditClick}>Editar Perfil</button> 
              <button className="button" onClick={handleBackHome}>Voltar</button>
              <button className="button" onClick={handleLogout}>Sair</button>
            </div>
          </div>
        </div>
      </div>
      {editMode && (
        <form className="edit-profile-form" onSubmit={handleUpdateProfile}>
          <label>
            Nome:
            <input
              type="name"
              name="nome"
              value={formData.nome}
              onChange={handleEditChange}
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Nickname:
            <input
              type="name"
              name="nickname"
              value={formData.nickname}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Foto:
            <input
              type="file"
              name="foto"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Salvar</button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default MeuPerfilPage;