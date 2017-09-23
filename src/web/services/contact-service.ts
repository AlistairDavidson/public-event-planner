import database from '../../common/database';
import searchService from './search-service';

import * as _ from 'lodash';
import * as SequelizeStatic from 'sequelize';

import { ContactDto, ContactInstance } from '../../common/models/contact';
import { ListDto } from '../../common/types';

export class ContactService {
    async list(query?: ListDto) {        
        return await searchService.list<ContactInstance>({
            model: database.models.Contact,
            query: query
        });
    }

    async get(contactId: number, full: boolean) {
        if(full) {
            return await database.models.Contact
                .findById(contactId, {
                    include: [{
                        model: database.models.ActContact,
                        include: [{
                            model: database.models.Contact
                        }]
                    }]
                });
        } else {
            return await database.models.Contact
                .findById(contactId);
        }
    }

    async save(contactData: ContactDto) {
        let contact;
        
        if(contactData.id) {
            contact = await database.models.Contact.findById(contactData.id);
        }

        if(!contact) {
            contact = await database.models.Contact.create(contactData);                
        } else {
            contact = await contact.update(contactData);
        }                  

        return contact;
    }

    async delete(contactId: number) {
        let contact = await database.models.Contact.findById(contactId);
        return await contact.destroy();
    }
}

export default new ContactService();