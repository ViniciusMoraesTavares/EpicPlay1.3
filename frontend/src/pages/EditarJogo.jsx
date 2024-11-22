import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditarJogo.css";

const EditarJogo = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [jogo, setJogo] = useState({
    nome: "",
    descricao: "",
    sinopse: "",
    preco: "",
    trailer: "",
    genero: "",
    capa: null,
    img_1: null,
    img_2: null,
    img_3: null,
  });

  const [fotos, setFotos] = useState({
    capa: null,
    img_1: null,
    img_2: null,
    img_3: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJogo = async () => {
      try {
        const response = await api.get(`/jogos/${id}`);
        setJogo({
          nome: response.data.nome,
          descricao: response.data.descricao,
          sinopse: response.data.sinopse || "",
          genero: response.data.genero || "",
          preco: response.data.preco,
          trailer: response.data.trailer,
          capa: response.data.capa,
          img_1: response.data.img_1,
          img_2: response.data.img_2,
          img_3: response.data.img_3,
          //faltando infos do jogo (mas vai ficar assim)
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar jogo:", error);
        toast.error("Erro ao carregar os dados do jogo.");
      }
    };

    fetchJogo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJogo({ ...jogo, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFotos({ ...fotos, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", jogo.nome);
    formData.append("descricao", jogo.descricao);
    formData.append("sinopse", jogo.sinopse);
    formData.append("preco", jogo.preco);
    formData.append("trailer", jogo.trailer);
    formData.append("genero", jogo.genero);
    if (fotos.capa) formData.append("capa", fotos.capa);
    if (fotos.img_1) formData.append("img_1", fotos.img_1);
    if (fotos.img_2) formData.append("img_2", fotos.img_2);
    if (fotos.img_3) formData.append("img_3", fotos.img_3);

    try {
      await api.put(`/jogos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Jogo atualizado com sucesso!");
      navigate("/admin/jogos"); 
    } catch (error) {
      console.error("Erro ao atualizar jogo:", error);
      toast.error("Erro ao atualizar os dados do jogo.");
    }
  };

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="editar-jogo-container">
      <h1>Editar Jogo</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={jogo.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome do jogo"
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={jogo.descricao}
            onChange={handleChange}
            required
            placeholder="Digite a descrição do jogo"
          />
        </div>
        <div className="form-group">
          <label>Sinopse:</label>
          <textarea
            name="sinopse"
            value={jogo.sinopse}
            onChange={handleChange}
            required
            placeholder="Digite a sinopse do jogo"
          />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input
            type="text"
            name="preco"
            value={jogo.preco}
            onChange={handleChange}
            required
            placeholder="Informe o preço do jogo"
          />
        </div>
        <div className="form-group">
          <label>Trailer (URL):</label>
          <input
            type="text"
            name="trailer"
            value={jogo.trailer}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Genero (URL):</label>
          <input
            type="text"
            name="trailer"
            value={jogo.genero}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Capa (Arquivo):</label>
          <input type="file" name="capa" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Imagem 1:</label>
          <input type="file" name="img_1" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Imagem 2:</label>
          <input type="file" name="img_2" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Imagem 3:</label>
          <input type="file" name="img_3" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn-save">
          Salvar Alterações
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditarJogo;
