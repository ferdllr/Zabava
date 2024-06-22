import React from 'react';
import LocalCard from './LocalCard';
import CardContainer from './CardContainer';
import { LocalData } from './LocalData';

interface LocalListProps {
  data: LocalData[];
}

const LocalList: React.FC<LocalListProps> = ({ data }) => {
  return (
    <CardContainer>
      {data.map((local, index) => (
        <LocalCard key={index} local={local} />
      ))}
    </CardContainer>
  );
};

export default LocalList;
