import { BookingDto, BookingsDto } from '../../common/models/booking';
import { EventDto } from '../../common/models/event';
import { ActDto } from '../../common/models/act';
import { BookingStatusDto } from '../../common/models/booking-status';
import { ActApplicationDto } from '../../common/models/act-application';
    
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
import { BookingEditorModalController } from '../components/booking/booking-editor-modal/booking-editor-modal';
import * as _ from 'lodash';

export class BookingService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService) {

    }

    list(query?: MdSortDto) {
        let url = `${settings.api}/booking/list`;

        if(query) {
            let listQuery = queryToRequest(query);
            let queryString = this.$httpParamSerializer(listQuery);

            url = `${url}?${queryString}`                
        }

        return this.$http.get(url)
            .then(response => {
                let bookingsResponse = response.data as BookingsDto;
                bookingsResponse.rows = bookingsResponse.rows.map(booking => new BookingViewModel(booking));

                return bookingsResponse;
            });            
    }

    listStatuses() {
         return this.$http.get(`${settings.api}/booking/status/list`)
            .then(response => response.data as BookingStatusDto[]);
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/booking/get?id=${id}`)
            .then(response => new BookingViewModel(response.data as BookingDto));
    }

    save(data: BookingDto) {
        return this.$http.post(`${settings.api}/booking/save`, data)
            .then(response => new BookingViewModel(response.data as BookingDto));
    }

    delete(data: BookingDto) {
        return this.$http.post(`${settings.api}/booking/delete`, { id: data.id })
            .then(response => new BookingViewModel(response.data as BookingDto));
    }         

    edit(ev: ng.IAngularEvent, booking?: BookingViewModel): ng.IPromise<BookingViewModel> {
        return this.$mdDialog.show({
            controller: BookingEditorModalController,
            templateUrl: 'components/booking/booking-editor-modal/booking-editor-modal.html',
            parent: element(document.body),
            targetBooking: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl',
            skipHide: true,
            autoWrap: true,
            resolve: {
                'booking': () => booking
            }
        } as any);
    }
}

export class BookingViewModel implements BookingDto {
    constructor(booking?: BookingDto) {
        if(booking) {
            _.extend(this, booking);
        }
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;

    tech_specs?: string;
    size_of_act?: number;
    size_of_party?: number;

    EventId?: number;
    ActId?: number;
    BookingStatusId?: number;
    ActApplicationId?: number;

    event?: EventDto;
    act?: ActDto;
    bookingStatus?: BookingStatusDto;
    actApplication?: ActApplicationDto; 
}

export default BookingService;