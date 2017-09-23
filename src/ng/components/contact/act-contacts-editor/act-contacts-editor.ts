import { ContactDto } from '../../../../common/models/contact';
import { ContactViewModel, ActContactViewModel } from '../../../services/contact-service';
import * as _ from 'lodash';

export class ActContactsEditorController implements angular.IComponentController {
    actContacts: ActContactViewModel[];

    relationship: string;
    contact: ContactViewModel;
    actId: number;

    constructor() {        
    }

    $onInit() {
        if(!this.actContacts) {
            this.actContacts = [];
        }
    }

    add() {
        this.actContacts.push( new ActContactViewModel({ ActId: this.actId }) );
    }

    remove(actContact: ActContactViewModel) {
        _.remove(this.actContacts, (ac) => ac == actContact);
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
