'use client'
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import PrimaryAppBar from "../components/AppBar";
import Tabs from '../components/Tabs';
import Footer from "../components/Footer";
import SearchCard from '../components/SearchCard';
import useStore from "../store";
import Image from 'next/image';
import './search.css'; // Certifique-se de que o caminho está correto

const Search: React.FC = () => {
  const { selectedTab } = useStore();
  const [localData, setLocalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTab === 'LOCAIS') {
      fetchLocals();
    }
  }, [selectedTab]);

  const fetchLocals = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/local/getAll');
      if (!response.ok) {
        throw new Error('Erro ao buscar locais');
      }
      const data = await response.json();
      setLocalData(data);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLocals = (locals: any[]) => {
    // Implementar lógica de filtro se necessário
    return locals; // Por enquanto, retorna todos os locais
  };

  const hasNoResults = filterLocals(localData).length === 0;

  return (
    <Box className="search-all">
      <PrimaryAppBar />
      <Box className="search-tabs-and-content">
        <Tabs />
        <Box className="search-content">
          {selectedTab === 'EVENTOS' && (
            <div>
              <div>Conteúdo da aba EVENTOS</div>
            </div>
          )}
          {selectedTab === 'LOCAIS' && (
            <div>
              {loading && <p>Carregando locais...</p>}
              {hasNoResults && !loading && (
                <Image
                  src="/not-found.png"
                  width={300}
                  height={300}
                  alt="Not found"
                  style={{ maxWidth: '300px' }}
                />
              )}
              {!hasNoResults && !loading && (
                <div className="search-card-list">
                  {filterLocals(localData).map((local) => (
                    <SearchCard
                      key={local.id}
                      title={local.nome}
                      subtitle={local.endereco}
                      imageUrl={local.imagemUrl}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Search;
