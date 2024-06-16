'use client'; // Adicione isso no topo do seu arquivo para indicar que é um Componente do Cliente
import { useRouter } from 'next/navigation'; // Importe useRouter de 'next/navigation'
import { useState } from 'react';
import PrimaryAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import './createEvent.css';
import { TextField } from '@mui/material';
import CommonlyUsedComponents from '../components/DateTimePicker';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function CreateEvent() {
  const [eventDates, setEventDates] = useState([<CommonlyUsedComponents key={0} />]);
  const router = useRouter(); // useRouter importado de next/navigation

  const handleAddDate = () => {
    const newEventDates = [...eventDates, <CommonlyUsedComponents key={eventDates.length} />];
    setEventDates(newEventDates);
  };

  const handleRemoveDate = (indexToRemove: number) => {
    const newEventDates = eventDates.filter((_, index) => index !== indexToRemove);
    setEventDates(newEventDates);
  };

  const handleCancel = () => {
    if (window.confirm('Os dados preenchidos serão apagados. Deseja continuar?')) {
      router.push('/');
    }
  };

  const handleSubmit = () => {
    if (window.confirm('O evento será salvo. Os dados estão corretos?')) {
      // Lógica para salvar o evento
    }
  };

  return (
    <div className='createEvent-all'>
      <PrimaryAppBar />
      <div className='createEvent-content'>
        <form action="" className='createEvent-form'>
          <div className='createEvent-form-user'>
            <h4 className='createEvent-h4'>Dados do Usuário</h4>
            <TextField required label="Nome do Usuário" />
          </div>
          <div className='createEvent-form-event'>
            <h4 className='createEvent-h4'>Dados do Evento</h4>
            <TextField required label="Nome do Evento" sx={{ width: '300px' }} />
            <TextField required label="Endereço do Evento" sx={{ width: '300px' }} />
            {eventDates.map((dateComponent, index) => (
              <div key={index}>
                {dateComponent}
                {eventDates.length > 1 && (
                  <button id='remove-date-button' type="button" onClick={() => handleRemoveDate(index)}>
                    <DeleteForeverIcon fontSize="small" />
                  </button>
                )}
              </div>
            ))}
            <div className='createEvent-add-date-button-container'>
              <button id='add-date-button' type="button" onClick={handleAddDate}>
                <AddCircleIcon fontSize="large" />
              </button>
              <p id='add-event-title'>Clique para adicionar mais datas para o evento.</p>
            </div>
            <TextField required label="Descrição do Evento" multiline sx={{ width: '300px' }} />
          </div>
          <div className='form-main-buttons'>
            <button id='flush-form-button' type="button" onClick={handleCancel}>Cancelar</button>
            <button id='submit-form-button' type='submit' onClick={handleSubmit}>Salvar Evento</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
