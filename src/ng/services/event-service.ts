import { EventDto, EventsDto } from '../../common/models/event';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
//import { EventEditorController } from '../components/event-editor/event-editor';

export default class EventService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService) {

    }

    list(query?: MdSortDto) {
        let url = `${settings.api}/event/list`;

        if(query) {
            let listQuery = queryToRequest(query);
            let queryString = this.$httpParamSerializer(listQuery);

            url = `${url}?${queryString}`                
        }

        return this.$http.get(url)
            .then(response => (response.data as EventsDto));            
    }

    get(id: number) {
        return this.$http.get(`${settings.api}/event/get?id=${id}`)
            .then(response => (response.data as EventDto));
    }

    save(data: EventDto) {
        return this.$http.post(`${settings.api}/event/save`, data)
            .then(response => (response.data as EventDto));
    }

    delete(data: EventDto) {
        return this.$http.post(`${settings.api}/event/delete`, { id: data.id })
            .then(response => (response.data as EventDto));
    }         
/*
    create(ev: ng.IAngularEvent) {
        return this.$mdDialog.show({
            controller: EventEditorController,
            templateUrl: 'components/event-editor/event-editor.html',
            parent: element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl'
        } as any);
    }*/
}