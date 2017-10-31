import ActService from '../../../services/act-service';
import { ActViewModel } from '../../../services/act-service';

export class ActEditorController implements angular.IComponentController {
    static $inject = ['actService', '$mdDialog'];
   
    actId: number;
    eventId: number;

    act: ActViewModel;

    constructor(private actService: ActService,
                private $mdDialog: ng.material.IDialogService) {
    }

    $onInit() {
        if(this.actId) {
            this.actService.get(this.actId, true)
                .then((act) => this.act = act);
        }        
    }

    save() {
        this.actService.save(this.act)
            .then((act) => {
                this.act = act;                
            });
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/act-editor/act-editor.html',
    controller: ActEditorController,
    bindings: {
        actId: '=?',
        eventId: '=?'
    }
}

export default options;
