import mongoose from 'mongoose';

const trabalhoSchema = new mongoose.Schema({
  funcao: { type: String, required: true },
  disponibilidade: { type: String, required: true },
});

export const TrabalhoModel = mongoose.model('Trabalho', trabalhoSchema);
