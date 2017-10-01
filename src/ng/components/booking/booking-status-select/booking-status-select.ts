import { BookingDto } from '../../../../common/models/booking';
import { BookingStatusDto } from '../../../../common/models/booking-status';
import BookingService from '../../../services/booking-service';

export class BookingStatusSelectController implements angular.IComponentController {
    static $inject = ['bookingService'];

    bookingStatus: BookingStatusDto;
    bookingStatusId: number;

    bookingStatuses: BookingStatusDto[];
    searchText: string;

    constructor(private bookingService: BookingService) {
    }

    $onInit() {
        this.bookingService.listStatuses()
            .then(bookingStatuses => this.bookingStatuses = bookingStatuses);
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/booking/booking-status-select/booking-status-select.html',
    controller: BookingStatusSelectController,
    bindings: {
        bookingStatus: '=?',
        bookingStatusId: '=?'
    }
}

export default options;
