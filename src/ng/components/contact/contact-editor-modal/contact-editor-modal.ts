import { ContactDto } from '../../../../common/models/contact';
import { ContactViewModel } from '../../../services/contact-service';
import ContactService from '../../../services/act-service';
import * as _ from 'lodash';

export class ContactEditorModalController implements angular.IComponentController {
    static $inject = ['$mdDialog', 'actService', 'contact', 'mode',];
    
    saving = false;

    constructor(private $mdDialog: ng.material.IDialogService,
                private contactService: ContactService,
                private contact?: ContactViewModel,
                private mode?: string) {
    }

    $onInit() {       
    }

    save() {
        console.log('modal saving', this.contact);
        this.saving = true;
        this.contactService.save(this.contact)
            .then((contact) => this.$mdDialog.hide(this.contact));
    }

    cancel() {
        this.$mdDialog.hide();
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/contact/contact-editor-modal/contact-editor-modal.html',
    controller: ContactEditorModalController,
    bindings: {
    }
}

export default options;
