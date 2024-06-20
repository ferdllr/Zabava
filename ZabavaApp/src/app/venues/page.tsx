'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PrimaryAppBar from '../components/AppBar';
import RenderGroup from '../components/RenderGroups';
import LocalList from '../components/LocalList';
import Footer from '../components/Footer';

export default function Venues() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [localData, setLocalData] = useState<any[]>([]);


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

  useEffect(() => {
    fetchLocals();
  }, []);

  const hasNoResults = localData.filter(local => !selectedNeighborhood || local.bairro === selectedNeighborhood).length === 0;

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
            style={{ maxWidth: '300' }}
          />
        ) : (
          <LocalList data={localData.filter(local => !selectedNeighborhood || local.bairro === selectedNeighborhood)} />
        )}
      </div>
      <Footer />
    </div>
  );
}
