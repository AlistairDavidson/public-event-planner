import { BookingViewModel } from '../../../services/booking-service';

export class BookingEditorFormController implements angular.IComponentController {
    booking?: BookingViewModel;

    fixedEvent: boolean;
    fixedAct: boolean;

    constructor() {
    }

    $onInit() {
        if(!this.booking) {
            this.booking = {}
        }

        this.fixedAct = !!this.booking.ActId;
        this.fixedEvent = !!this.booking.EventId;
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/booking/booking-editor-form/booking-editor-form.html',
    controller: BookingEditorFormController,
    bindings: {
        booking: '=?',
        onClose: '&?'
    }
}

export default options;
