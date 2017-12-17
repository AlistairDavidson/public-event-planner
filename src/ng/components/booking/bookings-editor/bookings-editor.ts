import { BookingViewModel, BookingService } from '../../../services/booking-service';
import * as _ from 'lodash';
import { BookingDto } from '../../../../common/models/booking';

export class BookingsEditorController implements angular.IComponentController {
    static $inject = ['bookingService'];

    bookings?: BookingViewModel[] = [];
    actId?: number;
    eventId?: number;
    editingBooking?: BookingViewModel;

    constructor(private bookingService: BookingService) {        
    }

    $onInit() {
        if(!this.bookings) {
            this.bookings = [];
        }
    }

    edit(booking?: BookingViewModel) {
        this.editingBooking = booking || new BookingViewModel({
            ActId: this.actId,
            EventId: this.eventId
        });

        if(!booking) {
            this.bookings.push(this.editingBooking);
        }
    }

    close() {
        this.editingBooking = null;
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/booking/bookings-editor/bookings-editor.html',
    controller: BookingsEditorController,
    bindings: {
        bookings: '=?',
        actId: '=?',
        eventId: '=?'    
    }
}

export default options;
