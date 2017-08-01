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
const passport = require("passport");
const web_decorators_1 = require("../services/web-decorators");
class LoginController {
    constructor(app) {
        app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true // allow flash messages
        }));
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true // allow flash messages
        }));
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                res.render('home.ejs');
            }
            else {
                res.render('index.ejs');
            }
        });
    }
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('home.ejs');
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                res.render('home.ejs');
            }
            else {
                res.render('login.ejs', { message: req.flash('loginMessage') });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                res.render('home.ejs');
            }
            else {
                res.render('signup.ejs', { message: req.flash('signupMessage') });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.logout();
            res.redirect('/');
        });
    }
}
__decorate([
    web_decorators_1.GET('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "index", null);
__decorate([
    web_decorators_1.GET('/home'),
    web_decorators_1.Auth(['view_profile']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "home", null);
__decorate([
    web_decorators_1.GET('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    web_decorators_1.GET('/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "signup", null);
__decorate([
    web_decorators_1.GET('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
exports.default = LoginController;
