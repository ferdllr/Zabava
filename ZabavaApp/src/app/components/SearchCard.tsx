import React from 'react';
import Image from 'next/image';

interface SearchCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ title, subtitle, imageUrl }) => {
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '300px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const textContainerStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#555',
  };

  const imageStyle: React.CSSProperties = {
    borderRadius: '8px',
    objectFit: 'cover',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(12px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
    >
      <Image 
        src='/venue.png'
        alt={title} 
        width={100} 
        height={100} 
        style={imageStyle} 
      />
      <div style={textContainerStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={subtitleStyle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default SearchCard;
