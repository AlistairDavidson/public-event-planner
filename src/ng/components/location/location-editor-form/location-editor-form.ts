import { LocationViewModel } from '../../../services/location-service';

export class LocationEditorFormController implements angular.IComponentController {
    location?: LocationViewModel;

    constructor() {
    }

    $onInit() {
        if(!this.location) {
            this.location = {}
        }
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/location/location-editor-form/location-editor-form.html',
    controller: LocationEditorFormController,
    bindings: {
        location: '=?'
    }
}

export default options;
