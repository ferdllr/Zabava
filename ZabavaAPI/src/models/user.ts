import mongoose, { Schema, Document } from 'mongoose';

// Definição do Enum TipoUsuario
export enum TipoUsuario {
  PROPRIETARIO = 'PROPRIETARIO',
  PRODUTOR = 'PRODUTOR',
  STAFF = 'STAFF',
}

// Definição do Schema de Trabalho
const trabalhoSchema = new Schema({
  funcao: { type: String, required: true },
  disponibilidade: { type: String, required: true },
});

// Modelo de Trabalho
export const TrabalhoModel = mongoose.model('trabalho', trabalhoSchema);

// Interface para o Schema de Usuário
interface User extends Document {
  name: string;
  email: string;
  password: string;
  cpf: string;
  tipo: TipoUsuario;
  trabalho: Schema.Types.ObjectId | null; // Referência ao documento Trabalho
}

// Schema de Usuário
const userSchema = new Schema<User>({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  cpf: {
    required: true,
    type: String,
  },
  tipo: {
    required: true,
    enum: Object.values(TipoUsuario),
    type: String,
  },
  trabalho: {
    required: false,
    type: Schema.Types.ObjectId,
    ref: 'trabalho', // Referência ao modelo Trabalho
    default: null
  },
});

// Modelo de Usuário
export const UserModel = mongoose.model<User>('User', userSchema);
