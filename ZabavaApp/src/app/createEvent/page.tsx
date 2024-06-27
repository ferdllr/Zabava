'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PrimaryAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import { getAllLocals } from '../api/localHandler';
import { getUserInfo } from '../api/authHandler';
import './createEvent.css';

export default function CreateEvent() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [nomeEvento, setNomeEvento] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const [locais, setLocais] = useState<any[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserName(userInfo.name);
        setUserId(userInfo.id);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const locaisData = await getAllLocals();
        setLocais(locaisData);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };
    fetchLocais();
  }, []);

  const handleCancel = () => {
    setConfirmMessage('Os dados preenchidos serão apagados. Deseja continuar?');
    setConfirmDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmCancel = () => {
    setConfirmDialogOpen(false);
    router.push('/');
  };

  const handleSubmit = () => {
    setConfirmMessage('O evento será salvo. Os dados estão corretos?');
    setConfirmDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    setConfirmDialogOpen(false);
    const novoEvento = {
      nome: nomeEvento,
      produtor: userId,
      local: selectedLocal,
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim),
      descricao: descricaoEvento // Adicionei descrição do evento aqui
    };
    try {
      const response = await fetch('http://localhost:4000/api/evento/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoEvento),
      });
      console.log(response.status)
      if (response.status == 200) {
        alert('dados enviados com sucesso!');
      } else {
        throw new Error('Erro ao enviar os dados');
      }
    } catch (error) {
      alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
      console.error('Erro ao enviar os dados do evento:', error);
    }
  };

  const handleChangeLocal = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLocal(e.target.value as string);
  };

  return (
    <div className='createEvent-all'>
      <PrimaryAppBar />
      <div className='createEvent-content'>
        <form className='createEvent-form'>
          <div className='createEvent-form-user'>
            <Typography variant="h4" className='createEvent-h4'>Dados do Usuário</Typography>
            <TextField required label="Nome do Usuário" value={userName} disabled fullWidth />
          </div>

          <div className='createEvent-form-event'>
            <Typography variant="h4" className='createEvent-h4'>Dados do Evento</Typography>
            <TextField
              required
              label="Nome do Evento"
              fullWidth
              value={nomeEvento}
              onChange={(e) => setNomeEvento(e.target.value)}
            />
            <TextField
              required
              select
              label="Selecione o Local"
              fullWidth
              value={selectedLocal}
              onChange={handleChangeLocal}
            >
              {locais.map((local) => (
                <MenuItem key={local._id} value={local._id}>
                  {local.nome} - {local.endereco}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              label="Data de Início"
              type="datetime-local"
              fullWidth
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              label="Data de Fim"
              type="datetime-local"
              fullWidth
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              label="Descrição do Evento"
              multiline
              fullWidth
              rows={4}
              value={descricaoEvento}
              onChange={(e) => setDescricaoEvento(e.target.value)}
            />
          </div>

          <div className='form-main-buttons'>
            <Button
              id='flush-form-button'
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              id='submit-form-button'
              type='button'
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Salvar Evento
            </Button>
          </div>
        </form>
      </div>
      <Footer />

      <Dialog open={confirmDialogOpen} onClose={handleCancelConfirm}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {confirmMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConfirm} color="secondary">
            Não
          </Button>
          <Button onClick={confirmMessage.includes('salvo') ? handleSaveConfirm : handleConfirmCancel} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
