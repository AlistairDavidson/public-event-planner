import { ContactDto } from '../../../../common/models/contact';
import { ContactViewModel, ActContactViewModel } from '../../../services/contact-service';
import ContactService from '../../../services/contact-service';
import * as _ from 'lodash';

export class ActContactsEditorController implements angular.IComponentController {
    static $inject = ['contactService']

    actContacts: ActContactViewModel[];
    editingActContact: ActContactViewModel;

    relationship: string;
    actId: number;

    constructor(private contactService: ContactService) {        
    }

    $onInit() {

    }

    edit(actContact?: ActContactViewModel) {
        console.log('edit', actContact);
        this.editingActContact = actContact || new ActContactViewModel();
        if(!actContact) {
            this.actContacts.push(this.editingActContact);
        }
    }

    close() {
        this.editingActContact = null;
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/contact/act-contacts-editor/act-contacts-editor.html',
    controller: ActContactsEditorController,
    bindings: {
        actContacts: '=?',
        actId: '=?'
    }
}

export default options;
