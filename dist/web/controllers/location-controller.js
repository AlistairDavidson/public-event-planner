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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const web_decorators_1 = require("../services/web-decorators");
const location_service_1 = require("../services/location-service");
class ApplicationController {
    constructor(app) {
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query;
            let result = yield location_service_1.default.list(query);
            return {
                rows: result.rows.map(row => row.toJSON()),
                count: result.count
            };
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            let full = !!req.query.full;
            let location = yield location_service_1.default.get(id, full);
            return location.toJSON();
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let locationData = req.body;
            let location = yield location_service_1.default.save(locationData);
            return location.toJSON();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            let location = yield location_service_1.default.delete(id);
            return { message: 'success' };
        });
    }
}
__decorate([
    web_decorators_1.GET('/api/location/list'),
    web_decorators_1.Auth(['view_location']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "list", null);
__decorate([
    web_decorators_1.GET('/api/location/get'),
    web_decorators_1.Auth(['view_location']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "get", null);
__decorate([
    web_decorators_1.POST('/api/location/save'),
    web_decorators_1.Auth(['edit_location']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "save", null);
__decorate([
    web_decorators_1.POST('/api/location/delete'),
    web_decorators_1.Auth(['edit_location']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "delete", null);
exports.default = ApplicationController;
