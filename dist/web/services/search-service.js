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
class SearchService {
    list(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('**** SEARCH RECIEVED', JSON.stringify(options.query));
            options.query = options.query ? options.query : {
                field: undefined,
                order: undefined,
                filter: undefined,
                offset: undefined,
                limit: undefined
            };
            options.query.field = options.query.field ? options.query.field : 'createdAt';
            options.query.order = options.query.order ? options.query.order : 'DESC';
            options.query.filter = options.query.filter ? options.query.filter : '';
            options.query.offset = options.query.offset ? options.query.offset : 0;
            options.query.limit = options.query.limit ? options.query.limit : 100;
            let opts = {
                offset: options.query.offset,
                limit: options.query.limit
            };
            if (options.query.field) {
                if (options.query.order != 'DESC') {
                    options.query.order = 'ASC';
                }
                opts.order = [[options.query.field, options.query.order]];
            }
            if (options.where) {
                opts.where = options.where;
            }
            else if (options.query.filter) {
                opts.where = {
                    name: {
                        $iLike: `%${options.query.filter}%`
                    }
                };
            }
            if (options.attributes) {
                opts.attributes = options.attributes;
            }
            if (options.include) {
                opts.include = options.include;
            }
            console.log('**** SEARCHING WITH', opts);
            let result = yield options.model.findAndCountAll(opts);
            return result;
        });
    }
}
exports.SearchService = SearchService;
exports.default = new SearchService();
