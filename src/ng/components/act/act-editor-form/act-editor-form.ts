import ActService, { ActViewModel } from '../../../services/act-service';

export class ActEditorFormController implements angular.IComponentController {
    act?: ActViewModel;
    actId?: number;
    eventId?: number;

    static $inject = ['actService']

    constructor(private actService: ActService) {
    }

    $onInit() {
        if(!this.act) {
            if(this.actId) {
                this.actService.get(this.actId, true)
                    .then((act) => {
                        this.act = act;
                    });
            } else {
                this.act = new ActViewModel();
            }
        }
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/act-editor-form/act-editor-form.html',
    controller: ActEditorFormController,
    bindings: {
        act: '=?',
        actId: '=?',
        eventId: '=?'
    }
}

export default options;
