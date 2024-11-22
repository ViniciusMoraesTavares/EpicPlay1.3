import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './empresa.css';


function CompanyPage() {
  const { id } = useParams();
  const [empresaData, setempresaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchempresaData = async () => {
      console.log("ID da empresa:", id);
      try {
        const response = await api.get(`/empresas/${id}`);
        if (response.status === 200 && response.data) {
          const empresa = response.data;

          empresa.foto = `${api.defaults.baseURL}/uploads/${empresa.foto}`;

          setempresaData(empresa);
        } else {
          console.error('Resposta inesperada da API:', response);
          setError('Erro ao carregar os dados da empresa.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da empresa:', error);
        setError('Erro ao conectar com a API. Verifique a conexão.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchempresaData();
    } else {
      setLoading(false);
      setError('ID da empresa não encontrado.');
    }
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!empresaData) return <p>Erro ao carregar dados da empresa.</p>;

  return (
    <div className="empresa-container">
      <div className="empresa-header">
        <img src={empresaData.foto} alt="foto da Empresa1" className="empresa-foto1" />
        <div className="empresa-info">
          <h1>{empresaData.nome}</h1>
          <p className="empresa-description">{empresaData.descricao}</p>
          {empresaData.redes_sociais && (
            <div className="social-links">
              <a href={empresaData.redes_sociais} target="_blank" rel="noopener noreferrer">
                Rede Social
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
