import mongoose from "mongoose"

export enum TipoUsuario {
  PROPRIETARIO = 'PROPRIETARIO',
PRODUTOR = 'PRODUTOR',
STAFF = 'STAFF'
}

const userSchema = new mongoose.Schema({
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
    type: String
  },
  cpf: {
    required: true,
    type: String
  },
  tipo: {
    required: true,
    enum: Object.values(TipoUsuario),
    type: String
  }
})

export const UserModel = mongoose.model("User", userSchema)