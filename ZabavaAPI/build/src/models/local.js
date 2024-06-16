"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const localSchema = new mongoose_1.default.Schema({
    endereco: { type: String, required: true },
    descricao: { type: String, required: true },
    cep: { type: String, required: true },
    estado: { type: String, required: true },
});
exports.LocalModel = mongoose_1.default.model('Local', localSchema);
