import React, { useState, useEffect } from "react";
import api from "../services/api"; 
import { ToastContainer, toast } from "react-toastify"; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom"; 
import "./EmpresaCrud.css";

const EmpresaCRUD = () => {
  const [empresas, setEmpresas] = useState([]);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  // Função para carregar as empresas
  const fetchEmpresas = async () => {
    try {
      const response = await api.get("/empresas");
      setEmpresas(response.data);
    } catch (error) {
      setErro("Não foi possível carregar as empresas. Tente novamente mais tarde.");
      console.error(error);
    }
  };

  // Função para excluir uma empresa
  const deleteEmpresa = async (id) => {
    try {
      await api.delete(`/empresas/${id}`);
      toast.success("Empresa excluída com sucesso!");
      fetchEmpresas(); 
    } catch (error) {
      toast.error("Erro ao excluir a empresa.");
      console.error(error);
    }
  };

  useEffect(() => {
    // Adiciona a classe 'crudempresa' ao body quando o componente é montado
    document.body.classList.add("crudempresa");

    // Remove a classe 'crudempresa' ao desmontar o componente
    return () => {
      document.body.classList.remove("crudempresa");
    };
  }, []); // Este efeito será executado apenas uma vez, quando o componente for montado

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleAddEmpresa = () => {
    navigate("/admin/empresa/adicionar");
  };

  const handleEditEmpresa = (id) => {
    navigate(`/empresas/editar/${id}`);
  };

  return (
    <div className="empresa-crud">
      <header className="empresa-header">
        <h1>Gerenciar Empresas</h1>
        <button className="add-button" onClick={handleAddEmpresa}>+</button>
      </header>

      {erro && <p className="error-message">{erro}</p>}

      <table className="empresa-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.length === 0 ? (
            <tr>
              <td colSpan="3">Nenhuma empresa cadastrada.</td>
            </tr>
          ) : (
            empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.nome}</td>
                <td>{empresa.descricao}</td>
                <td className="actions">
                  <button onClick={() => handleEditEmpresa(empresa.id)} className="edit-button">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteEmpresa(empresa.id)} className="delete-button">
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

export default EmpresaCRUD;
