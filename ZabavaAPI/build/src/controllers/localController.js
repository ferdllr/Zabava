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
const local_1 = require("../models/local");
let LocalController = class LocalController {
    async create(body) {
        const local = new local_1.LocalModel(body);
        try {
            await local.save();
            return 'OK';
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async all() {
        try {
            const locals = await local_1.LocalModel.find();
            return locals;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async update(body) {
        try {
            const updatedLocal = await local_1.LocalModel.findByIdAndUpdate(body.id, body, { new: true });
            return { result: updatedLocal };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const local = await local_1.LocalModel.findByIdAndDelete(id);
            return { data: local };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getById(id) {
        try {
            const local = await local_1.LocalModel.findById(id);
            if (!local) {
                return { error: 'Local not found' };
            }
            return local;
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
], LocalController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalController.prototype, "all", null);
__decorate([
    (0, tsoa_1.Patch)('/update'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocalController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)('/getById'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalController.prototype, "getById", null);
LocalController = __decorate([
    (0, tsoa_1.Route)('api/local')
], LocalController);
exports.default = LocalController;
