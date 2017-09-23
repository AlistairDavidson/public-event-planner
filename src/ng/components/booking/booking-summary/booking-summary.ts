import { BookingViewModel } from '../../../services/booking-service';
import * as _ from 'lodash';

export class BookingSummary implements angular.IComponentController {
    
    booking: BookingViewModel;

    constructor() {        
    }

    $onInit() {
    }    
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/contact/booking-summary/booking-summary.html',
    controller: BookingSummary,
    bindings: {
        booking: '='
    }
}

export default options;
