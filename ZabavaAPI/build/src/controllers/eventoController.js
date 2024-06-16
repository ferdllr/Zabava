"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const evento_1 = require("../models/evento");
let EventoController = class EventoController {
    async create(body) {
        const evento = new evento_1.EventoModel(body);
        try {
            await evento.save();
            return 'OK';
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async getAll() {
        try {
            const eventos = await evento_1.EventoModel.find();
            return eventos;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async update(body) {
        try {
            const updatedEvento = await evento_1.EventoModel.findByIdAndUpdate(body.id, body, { new: true });
            return { result: updatedEvento };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const evento = await evento_1.EventoModel.findByIdAndDelete(id);
            return { data: evento };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getById(id) {
        try {
            const evento = await evento_1.EventoModel.findById(id);
            if (!evento) {
                return { error: 'Evento not found' };
            }
            return evento;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
};
__decorate([
    (0, tsoa_1.Post)('/create'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "getAll", null);
__decorate([
    (0, tsoa_1.Patch)('/update'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/:id'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)('/getById'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "getById", null);
EventoController = __decorate([
    (0, tsoa_1.Route)('api/evento')
], EventoController);
exports.default = EventoController;
