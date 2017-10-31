import { ContactDto } from '../../../../common/models/contact';
import { ActContactViewModel, ContactViewModel } from '../../../services/contact-service';
import * as _ from 'lodash';

export class ActContactEditorFormController implements angular.IComponentController {
    static $inject = ['$mdDialog', '$scope']

    actContact: ActContactViewModel;
    searchContact: ContactViewModel;
    searchText: string;

    editingContact: ContactViewModel;

    constructor(private $mdDialog: ng.material.IDialogService,
                private $scope: ng.IScope) {        
    }

    $onInit() {
        this.$scope.$watch('$ctrl.actContact.name', () => {
            if(this.actContact.Contact.name) {
                this.searchContact = this.actContact.Contact;
            } else {
                this.searchContact = null;
            }
        });

        this.$scope.$watch('$ctrl.searchContact', () => {
            if(this.searchContact) {
                this.actContact.Contact = this.searchContact;
            } else if(this.actContact.Contact.name) {
                this.newContact();
            }
        });
    }

    edit() {
        if(!this.searchContact) {
            this.newContact();
        }
        this.editingContact = this.actContact.Contact;
    }

    newContact() {
        this.actContact.Contact = new ContactViewModel({ name: this.searchText });         
    }

    closeEditor() {
        this.editingContact = null;
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/contact/act-contact-editor-form/act-contact-editor-form.html',
    controller: ActContactEditorFormController,
    bindings: {
        actContact: '=?',
        mode: '=?',
        onClose: '&?'
    }
}

export default options;
