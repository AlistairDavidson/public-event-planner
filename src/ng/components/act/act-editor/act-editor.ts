import ActService from '../../../services/act-service';
import { ActViewModel } from '../../../services/act-service';

export class ActEditorController implements angular.IComponentController {
    static $inject = ['actService', '$mdDialog'];

    act?: ActViewModel;

    constructor(private actService: ActService,
                private $mdDialog: ng.material.IDialogService) {
    }

    $onInit() {
        if(!this.act) {
            this.act = new ActViewModel();
        }
    }

    save() {
        this.actService.save(this.act)
            .then((updatedAct) => this.act = updatedAct)
            .then(() => this.$mdDialog.hide(this.act));
    }

    cancel() {
         this.$mdDialog.cancel();
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act-editor/act-editor.html',
    controller: ActEditorController,
    bindings: {
        act: '=?'
    }
}

export default options;
