import { ActContactDto } from '../../common/models/act-contact';
import { ActDto } from '../../common/models/act';
import { ContactDto, ContactsDto, ContactDetailsDto } from '../../common/models/contact';
import { queryToRequest } from '../helpers/network';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import * as _ from 'lodash';
import { element } from 'angular';

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
}

export class ContactViewModel implements ContactDto {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name = '';

    details: ContactDetailsDto = {
        addresses: [],
        emails: [],
        phones: [],
        websites: [],
        images: []
    };

    ActContacts?: ActContactDto[] = [];

    constructor(contact?: ContactDto) {
        if(contact) {
            _.merge(this, contact);
        }
    }

    getEmail() {
        return this.details.emails[0];
    }

    getPhone() {
        return this.details.phones[0];
    }

    getWebsite() {
        let website = _.find(this.details.websites, (w) => !/twitter|facebook/i.test(w.url) );
        return website;
    }

    getTwitter() {
        let website = _.find(this.details.websites, (w) => /twitter/i.test(w.url) );
        return website;
    }

    getFacebook() {
        let website = _.find(this.details.websites, (w) => /facebook/i.test(w.url) );
        return website;
    }

    getImage() {
        return this.details.images[0];
    }
}


export class ActContactViewModel implements ActContactDto {
    id?: number;
    createdAt?: string;
    updatedAt?: string;

    relationship = '';    
    
    ActId?: number;
    ContactId?: number;

    Act?: ActDto;
    Contact?: ContactViewModel;

    constructor(actContact?: ActContactDto) {        
        if(actContact) {
            _.merge(this, actContact);
        }        

        this.Contact = new ContactViewModel(this.Contact);

        console.log('ACT-CONTACT', actContact, this)
    }
    
    getEmail() {        
        return this.Contact.getEmail();
    }

    getPhone() {
        return this.Contact.getPhone();
    }

    getWebsite() {
        return this.Contact.getWebsite();
    }

    getTwitter() {
        return this.Contact.getTwitter();
    }

    getFacebook() {
        return this.Contact.getFacebook();
    }

    getImage() {
        return this.Contact.getImage();
    }
}