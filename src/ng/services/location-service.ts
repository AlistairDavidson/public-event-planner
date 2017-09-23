import { LocationDto, LocationsDto } from '../../common/models/location'
import { EventDto } from '../../common/models/event';
import { TimeslotDto } from '../../common/models/timeslot';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
import { LocationEditorModalController } from '../components/location/location-editor-modal/location-editor-modal';
//import { LocationEditorModalController } from '../components/location/location-editor-modal/location-editor-modal';
import * as _ from 'lodash';

export default class LocationService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService) {

    }

    list(query?: MdSortDto) {
        let url = `${settings.api}/location/list`;

        if(query) {
            let listQuery = queryToRequest(query);
            let queryString = this.$httpParamSerializer(listQuery);

            url = `${url}?${queryString}`                
        }

        return this.$http.get(url)
            .then(response => {
                let locationsResponse = response.data as LocationsDto;
                locationsResponse.rows = locationsResponse.rows.map(location => new LocationViewModel(location));

                return locationsResponse;
            });            
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/location/get?id=${id}`)
            .then(response => new LocationViewModel(response.data as LocationDto));
    }

    save(data: LocationDto) {
        return this.$http.post(`${settings.api}/location/save`, data)
            .then(response => new LocationViewModel(response.data as LocationDto));
    }

    delete(data: LocationDto) {
        return this.$http.post(`${settings.api}/location/delete`, { id: data.id })
            .then(response => new LocationViewModel(response.data as LocationDto));
    }         

    edit(ev: ng.IAngularEvent, location: LocationViewModel): ng.IPromise<LocationViewModel> {
        return this.$mdDialog.show({
            controller: LocationEditorModalController,
            templateUrl: 'components/location/location-editor-modal/location-editor-modal.html',
            parent: element(document.body),
            targetLocation: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl',
            skipHide: true,
            resolve: {
                location: () => location
            }
        } as any);
    }
}

export class LocationViewModel implements LocationDto {
    constructor(location?: LocationDto) {
        if(location) {
            _.extend(this, location);
        }
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;

    name?: string;

    EventId?: number;

    event?: EventDto;
    timeslots?: TimeslotDto[];
}