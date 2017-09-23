import database from '../../common/database';
import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { ListDto } from '../../common/types';

export class SearchService {
async list<T>(options: {
    model: SequelizeStatic.Model<any, any>,
    query?: ListDto,
    where?: SequelizeStatic.WhereOptions,
    include?: SequelizeStatic.IncludeOptions[],
    order?: SequelizeStatic.FindOptions["order"],
    attributes?: string[]
}): Promise<{ rows: T[], count: number}> {
        console.log('**** SEARCH RECIEVED', JSON.stringify(options.query))
    
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

        let opts: SequelizeStatic.FindOptions = {            
            offset: options.query.offset,
            limit: options.query.limit            
        }

        if(options.query.field) {
            if(options.query.order != 'DESC') {
                options.query.order = 'ASC';
            }

            opts.order = [ [ options.query.field, options.query.order ] ]
        }

        if(options.where) {
            opts.where = options.where;            
        } else if(options.query.filter) {
            opts.where = {
                name: {
                    $iLike: `%${options.query.filter}%`
                }
            }
        }

        if(options.attributes) {
            opts.attributes = options.attributes
        }

        if(options.include) {
            opts.include = options.include;
        }


        console.log('**** SEARCHING WITH', opts);
        console.log('**** SEARCHING WITH', JSON.stringify(opts));

        let result = await options.model.findAndCountAll(opts);

        return result;
    }
}

export default new SearchService();