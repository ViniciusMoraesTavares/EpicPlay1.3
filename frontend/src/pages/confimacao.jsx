import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho para onde o AuthContext está definido.

function Confirmacao() {
  const { id } = useParams(); 
  const { state } = useLocation(); 
  const { gameData } = state || {};

  // Obter o nome do usuário do contexto de autenticação
  const { usuario } = useContext(AuthContext);
  const usuarioName = usuario?.nome || 'Jogador';

  if (!gameData) {
    return <p>Erro ao carregar os dados da compra.</p>;
  }

  // Gerar dados simulados
  const chaveAtivacao = uuidv4();
  
  // Ajustar o horário antes de formatar a data
  const dataCompra = new Date();
  dataCompra.setHours(dataCompra.getHours());
  const dataCompraFormatada = dataCompra.toLocaleString();

  return (
    <div className="confirmacao-container">
      <h1>Compra Confirmada!</h1>
      <p>Parabéns, {usuarioName}! Você comprou o jogo:</p>
      <h2>{gameData.nome}</h2>
      <p>Data da Compra: {dataCompraFormatada}</p>
      <p><strong>Código de Ativação:</strong> {chaveAtivacao}</p>
      <p>Aproveite o jogo!</p>
    </div>
  );
}

export default Confirmacao;
