'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PrimaryAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import './createLocal.css';

export default function CreateLocal() {
  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estado, setEstado] = useState('');
  const [rank, setRank] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const router = useRouter();

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
    setConfirmMessage('O local será salvo. Os dados estão corretos?');
    setConfirmDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    setConfirmDialogOpen(false);
    const novoLocal = {
      nome,
      bairro,
      endereco,
      descricao,
      estado,
      rank: Number(Math.floor(Math.random() * 5)),
    };
    try {
      const response = await fetch('http://localhost:4000/api/local/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoLocal),
      });
      if (response.status === 200) {
        alert('Dados enviados com sucesso!');
      } else {
        throw new Error('Erro ao enviar os dados');
      }
    } catch (error) {
      alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
      console.error('Erro ao enviar os dados do local:', error);
    }
  };

  return (
    <div className='createLocal-all'>
      <PrimaryAppBar />
      <div className='createLocal-content'>
        <form className='createLocal-form'>
          <Typography variant="h4" className='createLocal-h4'>Dados do Local</Typography>
          <TextField
            required
            label="Nome do Local"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            required
            label="Bairro"
            fullWidth
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <TextField
            required
            label="Endereço"
            fullWidth
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <TextField
            required
            label="Descrição"
            multiline
            fullWidth
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <TextField
            required
            label="Estado"
            fullWidth
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <TextField
            required
            label="Rank"
            type="number"
            fullWidth
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />

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
              Salvar Local
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
