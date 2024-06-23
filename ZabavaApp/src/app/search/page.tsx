'use client';
import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from "@mui/material";
import PrimaryAppBar from "../components/AppBar";
import Tabs from '../components/Tabs';
import Footer from "../components/Footer";
import SearchCard from '../components/SearchCard';
import useStore from "../store";
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import './search.css'; // Certifique-se de que o caminho está correto

const Search: React.FC = () => {
  const { selectedTab } = useStore();
  const [localData, setLocalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    return locals.filter(local =>
      local.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      local.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      local.bairro.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = filterLocals(localData);
  const hasNoResults = filteredData.length === 0;

  return (
    <Box className="search-all">
      <PrimaryAppBar />
      <Box className="search-input-container">
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '200px', marginBottom: '6px', marginTop: '2%', marginLeft: '2%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
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
                  {filteredData.map((local) => (
                    <SearchCard
                      key={local.id}
                      title={local.nome}
                      subtitle={local.endereco}
                      neighborhood={local.bairro}
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
