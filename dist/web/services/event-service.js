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
class EventService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield search_service_1.default.list({
                model: database_1.default.models.Event,
                query: query
            });
        });
    }
    get(eventId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.Event.findById(eventId, {
                    include: [{
                            model: database_1.default.models.Booking,
                            include: [{ model: database_1.default.models.BookingStatus }]
                        }, {
                            model: database_1.default.models.Location,
                            include: [{ model: database_1.default.models.Timeslot }]
                        }, {
                            model: database_1.default.models.ActApplication
                        }]
                });
            }
            else {
                return yield database_1.default.models.Event.findById(eventId);
            }
        });
    }
    save(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            let event;
            if (eventData.id) {
                event = yield database_1.default.models.Event.findById(eventData.id);
            }
            if (!event) {
                event = yield database_1.default.models.Event.create(eventData);
            }
            else {
                event = yield event.update(eventData);
            }
            return event;
        });
    }
    delete(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = yield database_1.default.models.Event.findById(eventId);
            return yield event.destroy();
        });
    }
}
exports.EventService = EventService;
exports.default = new EventService();
