import { LocationViewModel } from '../../../services/location-service';


export class LocationEditorModalController implements angular.IComponentController {
    static $inject = ['$mdDialog', 'location'];    

    constructor(private $mdDialog: ng.material.IDialogService,
                private location?: LocationViewModel) {
    }

    $onInit() {      
    }

    save() {
        this.$mdDialog.hide(this.location);
    }

    cancel() {
         this.$mdDialog.cancel();
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/location/location-editor-modal/location-editor-modal.html',
    controller: LocationEditorModalController,
    bindings: {        
    }
}

export default options;
