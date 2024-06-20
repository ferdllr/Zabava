"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.TrabalhoModel = exports.TipoUsuario = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Definição do Enum TipoUsuario
var TipoUsuario;
(function (TipoUsuario) {
    TipoUsuario["PROPRIETARIO"] = "PROPRIETARIO";
    TipoUsuario["PRODUTOR"] = "PRODUTOR";
    TipoUsuario["STAFF"] = "STAFF";
})(TipoUsuario || (exports.TipoUsuario = TipoUsuario = {}));
// Definição do Schema de Trabalho
const trabalhoSchema = new mongoose_1.Schema({
    funcao: { type: String, required: true },
    disponibilidade: { type: String, required: true },
});
// Modelo de Trabalho
exports.TrabalhoModel = mongoose_1.default.model('trabalho', trabalhoSchema);
// Schema de Usuário
const userSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'trabalho', // Referência ao modelo Trabalho
        default: null
    },
});
// Modelo de Usuário
exports.UserModel = mongoose_1.default.model('User', userSchema);
