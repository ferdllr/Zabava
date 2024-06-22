'use client'
import React, { useState, useEffect } from 'react';
import PrimaryAppBar from '../components/AppBar';
import RenderGroup from '../components/RenderGroups';
import LocalList from '../components/LocalCardComponents/LocalList';
import Footer from '../components/Footer';
import Image from 'next/image';
import { LocalData } from '../components/LocalCardComponents/LocalData';
import './venues.css'

const Venues: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [localData, setLocalData] = useState<LocalData[]>([]);

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/local/getAll');
        if (!response.ok) {
          throw new Error('Erro ao buscar locais');
        }
        const data = await response.json();
        setLocalData(data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchLocals();
  }, []);

  const filterLocals = (locals: LocalData[]) => {
    return locals.filter(local => 
      !selectedNeighborhood || 
      local.bairro.toLowerCase() === selectedNeighborhood?.toLowerCase()
    );
  };

  const hasNoResults = filterLocals(localData).length === 0;

  return (
    <div className='venues-all'>
      <PrimaryAppBar />
      <div className='venues-body'>
        <RenderGroup onNeighborhoodSelect={setSelectedNeighborhood} />
        {hasNoResults ? (
          <Image
            src="/not-found.png"
            width={300}
            height={300}
            alt="Not found"
            style={{ maxWidth: '300px' }}
          />
        ) : (
          <LocalList data={filterLocals(localData)} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Venues;
