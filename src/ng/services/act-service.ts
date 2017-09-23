import { ActDto, ActsDto } from '../../common/models/act';
import { ContactDto } from '../../common/models/contact';
import { ActContactDto } from '../../common/models/act-contact';
import { BookingDto } from '../../common/models/booking';
import { TimeslotDto } from '../../common/models/timeslot';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
import { ActEditorModalController } from '../components/act/act-editor-modal/act-editor-modal';
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

        return this.$q.resolve([{ name: 'Test', id: 1 }]);
/*
        return this.$http.get(url)
            .then(response => {
                let actsResponse = response.data as ActsDto;
                actsResponse.rows = actsResponse.rows.map(act => new ActViewModel(act));

                return actsResponse;
            });    */        
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/act/get?id=${id}`)
            .then(response => new ActViewModel(response.data as ActDto));        
    }

    save(data: ActDto) {
        return this.$http.post(`${settings.api}/act/save`, data)
            .then(response => new ActViewModel(response.data as ActDto));
    }

    delete(data: ActDto) {
        return this.$http.post(`${settings.api}/act/delete`, { id: data.id })
            .then(response => new ActViewModel(response.data as ActDto));
    }         

    edit(ev: ng.IAngularEvent, act?: ActViewModel): ng.IPromise<ActViewModel> {
        return this.$mdDialog.show({
            controller: ActEditorModalController,
            templateUrl: 'components/act/act-editor-modal/act-editor-modal.html',
            parent: element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl',
            autoWrap: false,
            resolve: {
                'act': () => act,
                'eventId': () => this.$stateParams.event
            }
        } as any);
    }
}

export class ActViewModel implements ActDto {
    constructor(act?: ActDto) {
        if(act) {
            _.extend(this, act);
        }
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;

    name?: string;
    bio?: string;
    tech_specs?: string;
    town?: string;
    type?: string;

    mainContactId?: number;
    webContactId?: number;

    mainContact?: ContactDto;
    webContact?: ContactDto;
    actContacts?: ActContactDto[];
    timeslots?: TimeslotDto[];
    bookings?: BookingDto[];
}