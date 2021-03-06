import { ActDto, ActsDto } from '../../common/models/act';
import { ContactDto } from '../../common/models/contact';
import { ContactViewModel, ActContactViewModel } from './contact-service';
import { BookingViewModel } from './booking-service';
import { ActContactDto } from '../../common/models/act-contact';
import { BookingDto } from '../../common/models/booking';
import { TimeslotDto } from '../../common/models/timeslot';
import { queryToRequest } from '../helpers/network';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
import * as _ from 'lodash';

export default class ActService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog', '$stateParams'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService,
                private $stateParams: ng.ui.IStateParamsService) {

    }

    list(query?: MdSortDto) {
        let url = `${settings.api}/act/list`;

        if(query) {
            let listQuery = queryToRequest(query);
            let queryString = this.$httpParamSerializer(listQuery);

            url = `${url}?${queryString}`                
        }
  
        return this.$http.get(url)
            .then(response => {
                let actsResponse = response.data as ActsDto;
                actsResponse.rows = actsResponse.rows.map(act => new ActViewModel(act));

                return actsResponse;
            });   
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/act/get?id=${id}&full=${full}`)
            .then(response => new ActViewModel(response.data as ActDto));        
    }

    save(data: ActDto) {
        data.ActContacts = data.ActContacts.map(actContact => {
            if(actContact.Contact) {
                actContact.ContactId = actContact.Contact.id;
            }
            return actContact;
        });

        return this.$http.post(`${settings.api}/act/save`, data)
            .then(response => new ActViewModel(response.data as ActDto));
    }

    delete(data: ActDto) {
        return this.$http.post(`${settings.api}/act/delete`, { id: data.id })
            .then(response => new ActViewModel(response.data as ActDto));
    }
}

export class ActViewModel implements ActDto {
    id?: number;
    createdAt?: string;
    updatedAt?: string;

    name?: string = '';
    bio?: string;
    tech_specs?: string;
    town?: string;
    type?: string;

    mainContactId?: number;
    webContactId?: number;

    mainContact?: ContactViewModel = new ContactViewModel();
    webContact?: ContactViewModel = new ContactViewModel();
    ActContacts?: ActContactViewModel[] = [];
    Timeslots?: TimeslotDto[] = [];
    Bookings?: BookingViewModel[] = [];

    constructor(act: ActDto = {}) {
        this.mainContact = new ContactViewModel(act.mainContact);
        this.webContact = new ContactViewModel(act.webContact);

        this.ActContacts = this.ActContacts.map(ac => new ActContactViewModel(ac));
        this.Bookings = this.Bookings.map(b => new BookingViewModel(b));

        _.merge(this, act);    
    }

    getEmail() {        
        return this.mainContact.getEmail();
    }

    getPhone() {
        return this.mainContact.getPhone();
    }

    getWebsite() {
        return this.webContact.getWebsite();
    }

    getTwitter() {
        return this.webContact.getTwitter();
    }

    getFacebook() {
        return this.webContact.getFacebook();
    }

    getImage() {
        return this.webContact.getImage();
    }
}