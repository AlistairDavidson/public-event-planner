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
class ContactService {
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield search_service_1.default.list({
                model: database_1.default.models.Contact,
                query: query
            });
        });
    }
    get(contactId, full) {
        return __awaiter(this, void 0, void 0, function* () {
            if (full) {
                return yield database_1.default.models.Contact
                    .findById(contactId, {
                    include: [{
                            model: database_1.default.models.ActContact,
                            include: [{
                                    model: database_1.default.models.Contact
                                }]
                        }]
                });
            }
            else {
                return yield database_1.default.models.Contact
                    .findById(contactId);
            }
        });
    }
    save(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            let contact;
            if (contactData.id) {
                contact = yield database_1.default.models.Contact.findById(contactData.id);
            }
            if (!contact) {
                contact = yield database_1.default.models.Contact.create(contactData);
            }
            else {
                contact = yield contact.update(contactData);
            }
            return contact;
        });
    }
    delete(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            let contact = yield database_1.default.models.Contact.findById(contactId);
            return yield contact.destroy();
        });
    }
}
exports.ContactService = ContactService;
exports.default = new ContactService();
