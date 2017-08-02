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
const SequelizeStatic = require("sequelize");
class ActApplicationService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.order != 'ASC' && query.order != 'DESC') {
                throw 'Bad request';
            }
            let order = SequelizeStatic.json(`details.${query.field} ${query.order}`);
            let options = {
                order: order,
                offset: query.offset,
                limit: query.limit
            };
            if (query.filter) {
                options.where = SequelizeStatic.where(SequelizeStatic.cast(SequelizeStatic.col('details'), 'text'), {
                    $iLike: `%${query.filter}%`
                });
            }
            let result = yield database_1.default.models.ActApplication.findAndCountAll(options);
            return {
                applications: result.rows,
                count: result.count
            };
        });
    }
    get(actId) {
        return __awaiter(this, void 0, void 0, function* () {
            let application = yield database_1.default.models.ActApplication.findById(actId, {
                include: [{
                        model: database_1.default.models.Booking,
                        include: [{
                                model: database_1.default.models.Act
                            }]
                    }]
            });
            return application;
        });
    }
    save(actApplicationData) {
        return __awaiter(this, void 0, void 0, function* () {
            let application = yield database_1.default.models.ActApplication.findById(actApplicationData.id);
            if (!application) {
                application = yield database_1.default.models.ActApplication.create(actApplicationData);
            }
            return application;
        });
    }
    delete(actApplicationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let application = yield database_1.default.models.ActApplication.findById(actApplicationId);
            return yield application.destroy();
        });
    }
    /**
     * This can be called from an unauthed route
     */
    createFromRaw(actApplicationData) {
        return __awaiter(this, void 0, void 0, function* () {
            let application = yield database_1.default.models.ActApplication.create({
                details: actApplicationData
            });
            return application;
        });
    }
}
exports.ActApplicationService = ActApplicationService;
exports.default = new ActApplicationService();
