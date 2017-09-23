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
const search_service_1 = require("./search-service");
class ActApplicationService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                model: database_1.default.models.ActApplication,
                offset: query.offset,
                limit: query.limit
            };
            if (query.field) {
                if (query.order != 'DESC') {
                    query.order = 'ASC';
                }
                options.order = SequelizeStatic.json(`details.${query.field} ${query.order}`);
            }
            if (query.filter) {
                options.where = SequelizeStatic.and(SequelizeStatic.where(SequelizeStatic.cast(SequelizeStatic.col('details'), 'text'), {
                    $iLike: `%${query.filter}%`
                }), {
                    EventId: query.eventId
                });
            }
            else {
                options.where = {
                    EventId: query.eventId
                };
            }
            return yield search_service_1.default.list(options);
        });
    }
    get(actId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.ActApplication.findById(actId, {
                    include: [{
                            model: database_1.default.models.Booking,
                            include: [{
                                    model: database_1.default.models.Act
                                }]
                        }]
                });
            }
            else {
                return yield database_1.default.models.ActApplication.findById(actId);
            }
        });
    }
    save(actApplicationData) {
        return __awaiter(this, void 0, void 0, function* () {
            let application;
            if (actApplicationData.id) {
                application = yield database_1.default.models.ActApplication.findById(actApplicationData.id);
            }
            if (!application) {
                application = yield database_1.default.models.ActApplication.create(actApplicationData);
            }
            else {
                application = yield application.update(actApplicationData);
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
