"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../common/database");
const search_service_1 = require("./search-service");
class UserService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                model: database_1.default.models.User,
                query: query,
                attributes: ['id', 'username', 'uuid']
            };
            if (query.filter) {
                options.where = {
                    username: {
                        $iLike: `%${query.filter}%`
                    }
                };
            }
            return yield search_service_1.default.list(options);
        });
    }
    get(userId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.User.findById(userId, {
                    attributes: ['id', 'username', 'uuid'],
                    include: [{
                            model: database_1.default.models.Permission
                        }]
                });
            }
            else {
                return yield database_1.default.models.User.findById(userId, {
                    attributes: ['id', 'username', 'uuid']
                });
            }
        });
    }
    save(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (userData.id) {
                user = yield database_1.default.models.User.findById(userData.id);
            }
            if (!user) {
                user = yield database_1.default.models.User.create(userData);
            }
            else {
                user = yield user.update(userData);
            }
            return user;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield database_1.default.models.User.findById(userId);
            return yield user.destroy();
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService();
