import mongoose from 'mongoose';

const localSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  bairro: {type: String, required: true},
  endereco: { type: String, required: true },
  descricao: { type: String, required: true },
  estado: { type: String, required: true },
  rank: {type: Number, required: true}
});

export const LocalModel = mongoose.model('Local', localSchema);
