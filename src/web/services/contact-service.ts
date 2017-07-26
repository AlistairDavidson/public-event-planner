import database from '../../common/database';
import * as _ from 'lodash';

import { ContactDto, ContactInstance } from '../../common/models/contact';

export class ContactService {
    async get() {

    }

    async updateOrCreate(contactsData: ContactDto[]) {
        let contacts: ContactInstance[] = [];

        for(let contactData of contactsData) {
            let contact = await database.models.Contact.findById(contactData.id);
            if(!contact) {
                contact = await database.models.Contact.create(contactData);                
            } else {
                contact = await contact.update(contactData);
            }

            // intersect addy removey on contact details

            contacts.push(contact);
        }

        return contacts;
    }

    async delete() {

    }
}

export default new ContactService();