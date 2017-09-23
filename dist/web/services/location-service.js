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
class LocationService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query.eventId) {
                throw {
                    status: 400,
                    code: 'BAD_REQUEST',
                    message: `No event id supplied`
                };
            }
            let where = {
                EventId: query.eventId
            };
            if (query.filter) {
                where.name = {
                    $iLike: `%${query.filter}%`
                };
            }
            return yield search_service_1.default.list({
                model: database_1.default.models.Location,
                query: query,
                where: where
            });
        });
    }
    get(locationId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.Location.findById(locationId, {
                    include: [{
                            model: database_1.default.models.Event
                        }]
                });
            }
            else {
                return yield database_1.default.models.Location.findById(locationId);
            }
        });
    }
    save(locationData) {
        return __awaiter(this, void 0, void 0, function* () {
            let location;
            if (locationData.id) {
                location = yield database_1.default.models.Location.findById(locationData.id);
            }
            if (!location) {
                location = yield database_1.default.models.Location.create(locationData);
            }
            else {
                location = yield location.update(locationData);
            }
            return location;
        });
    }
    delete(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let location = yield database_1.default.models.Location.findById(locationId);
            return yield location.destroy();
        });
    }
}
exports.LocationService = LocationService;
exports.default = new LocationService();
