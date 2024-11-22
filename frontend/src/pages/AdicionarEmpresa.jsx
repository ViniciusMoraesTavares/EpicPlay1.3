import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import './AdiconarEmpresa.css';

const AdicionarEmpresa = () => {
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState({
    nome: "",
    descricao: "",
    redes_sociais: "",
  });
  const [foto, setFoto] = useState(null); 

  // Manipula mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  // Manipula a seleção de arquivos
  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Envia os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", empresa.nome);
    formData.append("descricao", empresa.descricao);
    formData.append("redes_sociais", empresa.redes_sociais);

    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await api.post("/empresas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Empresa adicionada com sucesso!"); 
      setTimeout(() => {
        navigate("/admin/empresas"); 
      }, 3000); // Aguarda antes de redirecionar
    } catch (error) {
      console.error("Erro ao adicionar empresa:", error);
      toast.error("Erro ao adicionar a empresa. Verifique os dados e tente novamente."); 
    }
  };

  return (
    <div className="empresa-container">
      <h1>Adicionar Nova Empresa</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={empresa.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={empresa.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Redes Sociais:</label>
          <input
            type="text"
            name="redes_sociais"
            value={empresa.redes_sociais}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Foto (Arquivo):</label>
          <input type="file" name="foto" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn-save">
          Adicionar Empresa
        </button>
      </form>
      <ToastContainer /> {/* Componente para exibir as notificações */}
    </div>
  );
};

export default AdicionarEmpresa;
