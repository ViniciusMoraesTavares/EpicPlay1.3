import React, { useEffect, useState } from "react";
import api from "../services/api"; 
import "./Carrinho.css"; 

const Carrinho = () => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Substitua por uma lógica real para obter o ID do usuário
  const usuarioId = 1; 

  useEffect(() => {
    const fetchCarrinho = async () => {
      try {
        const response = await api.get(`/carrinho/${usuarioId}`);
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrinho();
  }, [usuarioId]);

  const handleComprarTodos = () => {
    console.log("Comprar todos os itens");
    // Implementar lógica de compra
  };

  const handleRemoverItem = async (id) => {
    try {
      await api.delete(`/carrinho`, { data: { jogo_id: id } });
      setItens(itens.filter((item) => item.jogo_id !== id));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="carrinho-container">
      <h1>Seu Carrinho</h1>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="carrinho-itens">
          {itens.map((item) => (
            <div className="carrinho-item" key={item.jogo_id}>
              <img src={item.jogo.capa} alt={item.jogo.nome} className="capa-jogo" />
              <div className="detalhes">
                <h2>{item.jogo.nome}</h2>
                <p>Preço: R$ {item.jogo.preco}</p>
                <button
                  className="btn-comprar"
                  onClick={() => console.log(`Comprando ${item.jogo.nome}`)}
                >
                  Comprar
                </button>
                <button
                  className="btn-remover"
                  onClick={() => handleRemoverItem(item.jogo_id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
          <button className="btn-comprar-todos" onClick={handleComprarTodos}>
            Comprar Todos
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
