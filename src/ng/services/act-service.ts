import { ActDto, ActsDto } from '../../common/models/act';
import { ContactDto } from '../../common/models/contact';
import { ImageDto, WebsiteDto, FacebookDto, TwitterDto } from '../../common/models/contact-detail';
import { ActContactDto } from '../../common/models/act-contact';
import { BookingDto } from '../../common/models/booking';
import { TimeslotDto } from '../../common/models/timeslot';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
import { ActEditorController } from '../components/act/act-editor/act-editor';
import * as _ from 'lodash';

export default class ActService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService) {

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
                actsResponse.acts = actsResponse.acts.map(act => new ActViewModel(act));
                return {
                    count: actsResponse.count,
                    data: actsResponse.acts
                }
            });            
    }

    get(id: number) {
        return this.$http.get(`${settings.api}/act/get?id=${id}`)
            .then(response => new ActViewModel(response.data));
    }

    save(data: ActDto) {
        return this.$http.post(`${settings.api}/act/save`, data)
            .then(response => new ActViewModel(response.data));
    }

    delete(data: ActDto) {
        return this.$http.post(`${settings.api}/act/delete`, { id: data.id })
            .then(response => new ActViewModel(response.data));
    }         

    create(ev: ng.IAngularEvent) {
        return this.$mdDialog.show({
            controller: ActEditorController,
            templateUrl: 'components/act/act-editor/act-editor.html',
            parent: element(document.body),
            targetAct: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl'
        } as any);
    }
}

export class ActViewModel implements ActDto {
    constructor(act?: ActDto) {
        _.extend(this, act);
    }

    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    name?: string;
    bio?: string;
    tech_specs?: string;
    size?: number;
    town?: string;
    image?: string;
    type?: string;

    mainContactId?: number;
    webContactId?: number;

    mainContact?: ContactDto;
    webContact?: ContactDto;
    actContacts?: ActContactDto[];
    timeslots?: TimeslotDto[];
    bookings?: BookingDto[];

    getImage() {
        let imageContact = _.filter(this.webContact.contactDetails, { type: 'Image' });
        return (imageContact[0].data as ImageDto).image;
    }

    getWebsite() {
        let imageContact = _.filter(this.webContact.contactDetails, { type: 'Website' });
        return (imageContact[0].data as WebsiteDto).website;
    }

    getFacebook() {
        let imageContact = _.filter(this.webContact.contactDetails, { type: 'Facebook' });
        return (imageContact[0].data as FacebookDto).facebook;
    }

    getTwitter() {
        let imageContact = _.filter(this.webContact.contactDetails, { type: 'Twitter' });
        return (imageContact[0].data as TwitterDto).twitter;
    }
}