"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.TipoUsuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var TipoUsuario;
(function (TipoUsuario) {
    TipoUsuario["PROPRIETARIO"] = "PROPRIETARIO";
    TipoUsuario["PRODUTOR"] = "PRODUTOR";
    TipoUsuario["STAFF"] = "STAFF";
})(TipoUsuario || (exports.TipoUsuario = TipoUsuario = {}));
const userSchema = new mongoose_1.default.Schema({
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
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
