import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify"; // Importa Toastify
import "react-toastify/dist/ReactToastify.css"; // Importa os estilos do Toastify
import "./EditarEmpresa.css";

const EditarEmpresa = () => {
  const { id } = useParams(); // Obtém o ID da empresa a ser editada da URL
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState({
    nome: "",
    descricao: "",
    redes_sociais: "",
  });
  const [foto, setFoto] = useState(null); // Para armazenar o arquivo selecionado
  const [loading, setLoading] = useState(true);

  // Função para carregar os dados da empresa ao abrir a página
  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await api.get(`/empresas/${id}`);
        setEmpresa({
          nome: response.data.nome,
          descricao: response.data.descricao,
          redes_sociais: response.data.redes_sociais,
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar empresa:", error);
        toast.error("Erro ao carregar os dados da empresa."); // Notificação de erro
      }
    };

    fetchEmpresa();
  }, [id]);

  // Função para manipular as mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  // Função para manipular a seleção de arquivos
  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Função para enviar os dados atualizados
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", empresa.nome);
    formData.append("descricao", empresa.descricao);
    formData.append("redes_sociais", empresa.redes_sociais);

    if (foto) {
      formData.append("foto", foto); // Adiciona o arquivo apenas se ele for selecionado
    }

    try {
      await api.put(`/empresas/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Empresa atualizada com sucesso!"); // Notificação de sucesso
      setTimeout(() => {
        navigate("/admin/empresas"); // Redireciona após um curto intervalo
      }, 3000); // Aguarda 3 segundos antes de redirecionar
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      toast.error("Erro ao atualizar os dados da empresa."); // Notificação de erro
    }
  };

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="editar-empresa-container">
      <h1>Editar Empresa</h1>
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
          Salvar Alterações
        </button>
      </form>
      <ToastContainer /> {/* Componente para exibir as notificações */}
    </div>
  );
};

export default EditarEmpresa;
