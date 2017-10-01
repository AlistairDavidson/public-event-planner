import { BookingDto } from '../../../../common/models/booking';
import { BookingViewModel } from '../../../services/booking-service';
import BookingService from '../../../services/booking-service';

export class BookingSearchController implements angular.IComponentController {
    static $inject = ['bookingService'];

    booking: BookingViewModel;
    bookingId: number;
    eventId: number;
    actId: number;

    searchText: string;
    
    constructor(private bookingService: BookingService) {
    }

    $onInit() {
        if(!this.booking && this.bookingId) {
            this.bookingService.get(this.bookingId, false)
                .then(booking => this.booking = booking);
        }
    }

    edit(ev: ng.IAngularEvent) {
        this.bookingService.edit(ev)            
            .then(booking => {
                this.booking = booking;
            });
    }

    search(searchText: string) {
        let query: any = {
            order: 'name',
            limit: 25,
            page: 1,
            filter: searchText
        }

        if(this.eventId) {
            query.eventId = this.eventId;
        }

        if(this.actId) {
            query.actId = this.actId;
        }

        return this.bookingService.list(query)
            .then(bookings => bookings.rows);
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/booking/booking-search/booking-search.html',
    controller: BookingSearchController,
    bindings: {
        eventId: '=?',
        actId: '=?',
        booking: '=?',
        bookingId: '=?'
    }
}

export default options;
