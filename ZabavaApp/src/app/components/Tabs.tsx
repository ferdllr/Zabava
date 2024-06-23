import React from 'react';
import useStore from '../store';

const Tabs: React.FC = () => {
  const { selectedTab, setSelectedTab } = useStore();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', marginTop: '16px' }}>
      <button
        style={{
          padding: '8px 16px',
          border: 'none',
          width: '100px',
          fontWeight: selectedTab === 'EVENTOS' ? 'bold' : 'normal',
          borderBottom: selectedTab === 'EVENTOS' ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.14)',
          backgroundColor: selectedTab === 'EVENTOS' ? '#ffffff' : '#ffffff',
          color: selectedTab === 'EVENTOS' ? '#000000' : '#000000',
          cursor: 'pointer',
        }}
        onClick={() => setSelectedTab('EVENTOS')}
      >
        EVENTOS
      </button>
      <button
        style={{
          padding: '8px 16px',
          border: 'none',
          width: '100px',
          fontWeight: selectedTab === 'LOCAIS' ? 'bold' : 'normal',
          borderBottom: selectedTab === 'LOCAIS' ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.14)',
          backgroundColor: selectedTab === 'LOCAIS' ? '#ffffff' : '#ffffff',
          color: selectedTab === 'LOCAIS' ? '#000000' : '#000000',
          cursor: 'pointer',
        }}
        onClick={() => setSelectedTab('LOCAIS')}
      >
        LOCAIS
      </button>
    </div>
  );
};

export default Tabs;
