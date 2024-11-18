import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fotoUser from "../assets/imgs/fotoUser.png";
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
    const fetchMeuPerfil = async () => {
      try {
        const response = await api.get("/usuarios/me", { withCredentials: true });
        setMeuPerfil(response.data);
        setFormData({
          nome: response.data.nome,
          email: response.data.email,
          nickname: response.data.nickname,
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar seu perfil.");
        setLoading(false);
      }
    };

    fetchMeuPerfil();
  }, []);

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
    if (formData.foto) {
      data.append("foto", formData.foto);
    }

    try {
      const response = await api.put("/usuarios/me", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setMeuPerfil(response.data);
      setEditMode(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    }
  };

   const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLBackHome = () => {
    navigate("/");
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="meu-perfil-container">
      <h1>{meuPerfil?.nickname}</h1>
      {meuPerfil ? (
        <div className="perfil-detalhes">
          {editMode ? (
            <form onSubmit={handleUpdateProfile}>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Nick:</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label>Foto:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <button type="submit">Salvar alterações</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancelar
              </button>
            </form>
          ) : (
            <div>
              <img
                src={meuPerfil.foto || fotoUser}
                alt={`${meuPerfil.nome} Foto de Perfil`}
                className="perfil-foto"
              />
              <p><strong>Nome:</strong> {meuPerfil.nome}</p>
              <p><strong>Email:</strong> {meuPerfil.email}</p>
              <p><strong>Papel:</strong> {meuPerfil.role}</p>
              <button onClick={() => setEditMode(true)}>Editar Perfil</button>
              <button onClick={handleLogout}>Sair</button>
              <button onClick={handleLBackHome}>Voltar</button>
            </div>
          )}
        </div>
      ) : (
        <p>Erro ao carregar os detalhes do perfil.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default MeuPerfilPage;
