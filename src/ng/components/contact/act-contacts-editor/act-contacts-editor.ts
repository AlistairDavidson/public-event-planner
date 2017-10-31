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
        if(!this.actContacts) {
            this.actContacts = [
                new ActContactViewModel({
                    relationship: 'Manager',
                    Contact: new ContactViewModel({
                        name: 'Bob McBobson',
                        details: {
                            phones: [{
                                phone: '0000 0000 0000'
                            }],
                            emails: [{
                                email: 'bob@example.com'
                            }]
                        }
                    })
                }),
                new ActContactViewModel({
                    relationship: 'Drummer',
                    Contact: new ContactViewModel({
                        name: 'Ringo Starr'
                    })
                })    
            ];
        }
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
