import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdicionarJogo.css";

const AdicionarJogo = () => {
  const navigate = useNavigate();

  const [jogo, setJogo] = useState({
    nome: "",
    descricao: "",
    sinopse: "",
    preco: "",
    empresa_id: "",
    trailer: "",
  });

  const [fotos, setFotos] = useState({
    capa: null,
    img_1: null,
    img_2: null,
    img_3: null,
  });

  // Lida com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJogo({ ...jogo, [name]: value });
  };

  // Manipula a seleção dos arquivos de imagem
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFotos({ ...fotos, [name]: files[0] });
  };

  // Envia os dados do jogo ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar campos obrigatórios
    const { nome, descricao, preco, empresa_id } = jogo;
    if (!nome || !descricao || !preco || !empresa_id) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Criar FormData para enviar os dados e as fotos
    const formData = new FormData();
    formData.append("nome", jogo.nome);
    formData.append("descricao", jogo.descricao);
    formData.append("sinopse", jogo.sinopse);
    formData.append("preco", jogo.preco);
    formData.append("empresa_id", jogo.empresa_id);
    formData.append("trailer", jogo.trailer);

    // Adiciona os arquivos ao FormData apenas se estiverem selecionados
    if (fotos.capa) formData.append("capa", fotos.capa);
    if (fotos.img_1) formData.append("img_1", fotos.img_1);
    if (fotos.img_2) formData.append("img_2", fotos.img_2);
    if (fotos.img_3) formData.append("img_3", fotos.img_3);

    try {
      // Envia os dados para a API
      const response = await api.post("/jogos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Jogo adicionado com sucesso!");
      navigate("/admin/jogos"); // Redireciona para a página de listagem de jogos
    } catch (error) {
      console.error("Erro ao adicionar jogo:", error.response?.data || error.message);
      toast.error("Erro ao adicionar o jogo. Tente novamente.");
    }
  };

  return (
    <div className="adicionar-jogo-container">
      <h1>Adicionar Novo Jogo</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={jogo.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={jogo.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sinopse:</label>
          <textarea
            name="sinopse"
            value={jogo.sinopse}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            value={jogo.preco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID da Empresa:</label>
          <input
            type="text"
            name="empresa_id"
            value={jogo.empresa_id}
            onChange={handleChange}
            required
            placeholder="Insira o ID da empresa"
          />
        </div>
        <div className="form-group">
          <label>Trailer (URL):</label>
          <input
            type="text"
            name="trailer"
            value={jogo.trailer}
            onChange={handleChange}
            placeholder="URL do trailer"
          />
        </div>
        <div className="form-group">
          <label>Capa (Imagem):</label>
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
          Adicionar Jogo
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdicionarJogo;
