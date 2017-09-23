import { BookingViewModel } from '../../../services/booking-service';

export class BookingEditorFormController implements angular.IComponentController {
    booking?: BookingViewModel;

    constructor() {
    }

    $onInit() {
        if(!this.booking) {
            this.booking = {}
        }
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/booking/booking-editor-form/booking-editor-form.html',
    controller: BookingEditorFormController,
    bindings: {
        booking: '=?'
    }
}

export default options;
