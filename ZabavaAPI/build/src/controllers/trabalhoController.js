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
const trabalho_1 = require("../models/trabalho");
let TrabalhoController = class TrabalhoController {
    async create(body) {
        const trabalho = new trabalho_1.TrabalhoModel(body);
        try {
            await trabalho.save();
            return 'OK';
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async getAll() {
        try {
            const trabalhos = await trabalho_1.TrabalhoModel.find();
            return trabalhos;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async update(body) {
        try {
            const updatedTrabalho = await trabalho_1.TrabalhoModel.findByIdAndUpdate(body.id, body, { new: true });
            return { result: updatedTrabalho };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const trabalho = await trabalho_1.TrabalhoModel.findByIdAndDelete(id);
            return { data: trabalho };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getById(id) {
        try {
            const trabalho = await trabalho_1.TrabalhoModel.findById(id);
            if (!trabalho) {
                return { error: 'Trabalho not found' };
            }
            return trabalho;
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
], TrabalhoController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrabalhoController.prototype, "getAll", null);
__decorate([
    (0, tsoa_1.Patch)('/update'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrabalhoController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/:id'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrabalhoController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)('/getById'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrabalhoController.prototype, "getById", null);
TrabalhoController = __decorate([
    (0, tsoa_1.Route)('api/trabalho')
], TrabalhoController);
exports.default = TrabalhoController;
