import React, { useState, useEffect } from "react";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify"; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; 
import "./JogosCrud.css";

const JogosCRUD = () => {
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();
  const fetchJogos = async () => {
    try {
      const response = await api.get("/jogos");
      setJogos(response.data);
    } catch (error) {
      setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
      console.error(error);
      toast.error("Erro ao carregar os jogos."); 
    }
  };

  const deleteJogo = async (id) => {
    try {
      await api.delete(`/jogos/${id}`);
      toast.success("Jogo excluído com sucesso!"); 
      fetchJogos(); 
    } catch (error) {
      toast.error("Erro ao excluir o jogo."); 
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJogos();
  }, []);

  const handleAddJogo = () => {
    navigate("/admin/jogo/adicionar");
  };

  const handleEditJogo = (id) => {
    navigate(`/admin/jogo/editar/${id}`);
  };

  return (
    <div className="jogo-crud">
      <header className="jogo-header">
        <h1>Gerenciar Jogos</h1>
        <button className="add-button" onClick={handleAddJogo}>+</button>
      </header>

      {erro && <p className="error-message">{erro}</p>}

      <table className="jogo-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Genero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogos.length === 0 ? (
            <tr>
              <td colSpan="4">Nenhum jogo cadastrado.</td>
            </tr>
          ) : (
            jogos.map((jogo) => (
              <tr key={jogo.id}>
                <td>{jogo.nome}</td>
                <td>{jogo.descricao}</td>
                <td>{jogo.preco}</td>
                <td>{jogo.genero}</td>
                <td className="actions">
                  <button onClick={() => handleEditJogo(jogo.id)} className="edit-button">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteJogo(jogo.id)} className="delete-button">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ToastContainer /> 
    </div>
  );
};

export default JogosCRUD;
