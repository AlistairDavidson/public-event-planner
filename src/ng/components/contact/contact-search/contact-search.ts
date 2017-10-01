import { ContactDto } from '../../../../common/models/contact';
import { ContactViewModel } from '../../../services/contact-service';
import ContactService from '../../../services/contact-service';

export class ContactSearchController implements angular.IComponentController {
    static $inject = ['contactService'];

    contact: ContactViewModel;
    contactId: number;

    searchText: string;

    constructor(private contactService: ContactService) {
    }

    $onInit() {
        if(!this.contact && this.contactId) {
            this.contactService.get(this.contactId, false)
                .then(contact => this.contact = contact);
        }
    }

    edit(ev: ng.IAngularEvent) {
        this.contactService.edit(ev)            
            .then(contact => {
                this.contact = contact;
            });
    }

    search(searchText: string) {
        return this.contactService.list({
            order: 'name',
            limit: 25,
            page: 0,
            filter: searchText
        });
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/contact/contact-search/contact-search.html',
    controller: ContactSearchController,
    bindings: {
        contact: "=?",
        contactId: "=?"
    }
}

export default options;