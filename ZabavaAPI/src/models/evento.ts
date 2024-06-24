import mongoose, { Schema, Document } from 'mongoose';
import { UserModel } from './user';
import { LocalModel } from './local';

const eventoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  produtor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  local: {
    type: Schema.Types.ObjectId,
    ref: 'Local',
    required: true,
  },
  dataInicio: {
    type: Date,
    required: true,
  },
  dataFim: {
    type: Date,
    required: true,
  },
  funcionarios: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
});

export const EventoModel = mongoose.model('Evento', eventoSchema);

