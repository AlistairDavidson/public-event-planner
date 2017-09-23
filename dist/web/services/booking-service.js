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
class BookingService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where;
            if (!query.eventId && !query.actId) {
                throw {
                    status: 400,
                    code: 'BAD_REQUEST',
                    message: `No event or act id supplied`
                };
            }
            if (query.eventId) {
                where = {
                    EventId: query.eventId
                };
            }
            if (query.actId) {
                where = {
                    ActId: query.actId
                };
            }
            return yield search_service_1.default.list({
                model: database_1.default.models.Booking,
                query: query,
                where: where
            });
        });
    }
    listBookingStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.models.BookingStatus.all();
        });
    }
    get(bookingId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.Booking.findById(bookingId, {
                    include: [{
                            model: database_1.default.models.BookingStatus
                        }, {
                            model: database_1.default.models.Act
                        }, {
                            model: database_1.default.models.ActApplication
                        }]
                });
            }
            else {
                return yield database_1.default.models.Booking.findById(bookingId);
            }
        });
    }
    save(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            let booking;
            if (bookingData.id) {
                booking = yield database_1.default.models.Booking.findById(bookingData.id);
            }
            if (!booking) {
                booking = yield database_1.default.models.Booking.create(bookingData);
            }
            else {
                booking.update(bookingData);
            }
            return booking;
        });
    }
    delete(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            let booking = yield database_1.default.models.Booking.findById(bookingId);
            return yield booking.destroy();
        });
    }
}
exports.BookingService = BookingService;
exports.default = new BookingService();
