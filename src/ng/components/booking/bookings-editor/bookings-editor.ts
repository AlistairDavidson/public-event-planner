import { BookingViewModel, BookingService } from '../../../services/booking-service';
import * as _ from 'lodash';

export class BookingsEditorController implements angular.IComponentController {
    static $inject = ['bookingService'];

    bookings?: BookingViewModel[] = [];
    actId?: number;
    eventId?: number;

    constructor(private bookingService: BookingService) {        
    }

    $onInit() {
    }

    add(ev: ng.IAngularEvent) {
        let options: BookingViewModel = {};
        
        if(this.actId) {
            options.ActId = this.actId;
        }

        if(this.eventId) {
            options.EventId = this.eventId;
        }

        this.bookingService.edit(ev, options)
            .then(booking => {
                this.bookings.push( booking );
            });
    }

    remove(booking: BookingViewModel) {
        _.remove(this.bookings, (ac) => ac == booking);
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
