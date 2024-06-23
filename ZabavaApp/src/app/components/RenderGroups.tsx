import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';

const GroupHeader = styled('div')({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: 'black',
    backgroundColor: 'lightgray',
});

const GroupItems = styled('ul')({
  padding: 0,
});

interface RenderGroupProps {
  onNeighborhoodSelect: (neighborhood: string | null) => void;
}

const RenderGroup: React.FC<RenderGroupProps> = ({ onNeighborhoodSelect }) => {
  const options = neighborhoodName.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleNeighborhoodSelect = (event: React.ChangeEvent<{}>, value: { title: string } | null) => {
    onNeighborhoodSelect(value?.title || null);
  };

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      sx={{ width: 220,
            marginTop: 6,
       }}
      renderInput={(params) => <TextField {...params} label="Bairro" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      onChange={handleNeighborhoodSelect} // Using callback function
    />
  );
}

// neighborhoodName = should consume API?
const neighborhoodName = [
    { title: 'Ecoville' },
    { title: 'Batel' },
    { title: 'Colombo' },
    { title: 'Centro' },
    { title: 'Água Verde' },
    { title: 'Alto da Glória' },
    { title: 'Bigorrilho' },
    { title: 'Boa Vista' },
    { title: 'Campo Comprido' },
    { title: 'Santa Felicidade' },
    { title: 'Cristo Rei' },
    { title: 'Centro Cívico' },
    { title: 'Santo Inácio' },
    { title: 'Jardim Botânico' },
    { title: 'Ahú' },
    { title: 'Tarumã' },
    { title: 'Vila Izabel' }
]

export default RenderGroup;
