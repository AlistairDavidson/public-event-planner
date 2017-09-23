import { ActContactDto } from '../../common/models/act-contact';
import { ContactDto, ContactsDto, ContactDetailsDto } from '../../common/models/contact';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import * as _ from 'lodash';
import { element } from 'angular';
import { ContactEditorModalController } from '../components/contact/contact-editor-modal/contact-editor-modal';

export default class ContactService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService) {

    }

    list(query?: MdSortDto) {
        let url = `${settings.api}/contact/list`;

        if(query) {
            let listQuery = queryToRequest(query);
            let queryString = this.$httpParamSerializer(listQuery);

            url = `${url}?${queryString}`                
        }

        return this.$http.get(url)
            .then(response => {
                let contactsResponse = response.data as ContactsDto;
                contactsResponse.rows = contactsResponse.rows.map(contact => new ContactViewModel(contact));

                return contactsResponse;
            });            
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/contact/get?id=${id}`)
            .then(response => new ContactViewModel(response.data as ContactDto));
    }

    save(data: ContactDto) {
        return this.$http.post(`${settings.api}/contact/save`, data)
            .then(response => new ContactViewModel(response.data as ContactDto));
    }

    delete(data: ContactDto) {
        return this.$http.post(`${settings.api}/contact/delete`, { id: data.id })
            .then(response => new ContactViewModel(response.data as ContactDto));
    }         

    edit(ev: ng.IAngularEvent, contact?: ContactViewModel, mode?: string): ng.IPromise<ContactViewModel> {
        return this.$mdDialog.show({
            controller: ContactEditorModalController,
            templateUrl: 'components/contact/contact-editor-modal/contact-editor-modal.html',
            parent: element(document.body),
            targetAct: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl',
            skipHide: true,
            resolve: {
                'contact': () => contact,
                'mode': () => mode
            }
        } as any);
    }
}

export class ContactViewModel implements ContactDto {
    constructor(contact?: ContactDto) {
        if(contact) {
            _.extend(this, contact);
        }

        if(!this.details) {
            this.details = {
                addresses: [],
                emails: [],
                phones: [],
                websites: [],
                images: []
            }
        }

        if(!this.actContacts) {
            this.actContacts = [];
        }
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name = '';

    details: ContactDetailsDto;
    actContacts?: ActContactDto[];
}


export class ActContactViewModel implements ActContactDto {
    constructor(actContact?: ActContactDto) {
        if(actContact) {
            _.extend(this, actContact);
        }

        if(!this.contact) {
            this.contact = new ContactViewModel();
        }
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;

    relationship = '';
    contact?: ContactViewModel;
    
    ActId?: number;
    ContactId?: number;
}