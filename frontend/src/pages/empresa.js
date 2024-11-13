import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; // Importe a instância da API
import './empresa.css';

function CompanyPage() {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      console.log("ID da empresa:", id);
      try {
        const response = await api.get(`/empresas/${id}`); // Usando a instância 'api'
        
        if (response.status === 200 && response.data) {
          console.log("Dados recebidos da API:", response.data);
          setCompanyData(response.data);
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
      fetchCompanyData();
    } else {
      setLoading(false);
      setError('ID da empresa não encontrado.');
    }
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!companyData) return <p>Erro ao carregar dados da empresa.</p>;

  return (
    <div className="company-container">
      <div className="company-header">
        <img src={companyData.logo} alt="Logo da Empresa" className="company-logo" />
        <div className="company-info">
          <h1>{companyData.nome}</h1>
          <p className="company-description">{companyData.descricao}</p>
          <div className="social-links">
            <a href={companyData.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={companyData.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={companyData.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={companyData.website} target="_blank" rel="noopener noreferrer">Website</a>
          </div>
        </div>
      </div>

      <section className="company-image">
        <h2>Sobre a Empresa</h2>
        <img src={companyData.imagem} alt="Imagem da Empresa" />
      </section>
    </div>
  );
}

export default CompanyPage;
