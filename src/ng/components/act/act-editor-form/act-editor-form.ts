import { ActViewModel } from '../../../services/act-service';

export class ActEditorFormController implements angular.IComponentController {
    act?: ActViewModel;
    eventId?: number;

    constructor() {
    }

    $onInit() {
        if(!this.act) {
            this.act = new ActViewModel();
        }
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/act-editor-form/act-editor-form.html',
    controller: ActEditorFormController,
    bindings: {
        act: '=?',
        eventId: '=?'
    }
}

export default options;
