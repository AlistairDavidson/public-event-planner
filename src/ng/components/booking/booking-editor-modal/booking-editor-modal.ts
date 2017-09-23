import { BookingViewModel } from '../../../services/booking-service';


export class BookingEditorModalController implements angular.IComponentController {
    static $inject = ['$mdDialog', 'booking'];   

    constructor(private $mdDialog: ng.material.IDialogService,
                private  booking?: BookingViewModel) {
    }

    $onInit() {      
    }

    save() {
        this.$mdDialog.hide(this.booking);
    }

    cancel() {
         this.$mdDialog.cancel();
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/booking/booking-editor-modal/booking-editor-modal.html',
    controller: BookingEditorModalController,
    bindings: {
    }
}

export default options;
