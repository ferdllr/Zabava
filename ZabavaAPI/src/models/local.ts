import mongoose from 'mongoose';

const localSchema = new mongoose.Schema({
  endereco: { type: String, required: true },
  descricao: { type: String, required: true },
  cep: { type: String, required: true },
  estado: { type: String, required: true },
});

export const LocalModel = mongoose.model('Local', localSchema);
