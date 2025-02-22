"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrabalhoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const trabalhoSchema = new mongoose_1.default.Schema({
    funcao: { type: String, required: true },
    disponibilidade: { type: String, required: true },
});
exports.TrabalhoModel = mongoose_1.default.model('Trabalho', trabalhoSchema);
