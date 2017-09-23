import { ContactDto } from '../../../../common/models/contact';
import { ContactViewModel } from '../../../services/contact-service';
import * as _ from 'lodash';

export class ContactEditorFormController implements angular.IComponentController {
    contact: ContactViewModel;
    mode?: string;

    constructor() {        
    }

    $onInit() {
        if(!this.contact) {
            this.contact = new ContactViewModel();
        }
    }

    remove(array: string, detail: any) {
        let details = this.contact.details as any;
        _.remove(details[array], detail);
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/contact/contact-editor-form/contact-editor-form.html',
    controller: ContactEditorFormController,
    bindings: {
        contact: '=?',
        mode: '=?'
    }
}

export default options;
