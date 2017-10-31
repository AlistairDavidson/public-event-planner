import ActService from '../../../services/act-service';
import { ActViewModel } from '../../../services/act-service';
import * as _ from 'lodash';

export class ActEditorModalController implements angular.IComponentController {
    static $inject = ['actService', '$mdDialog', 'act', 'eventId'];
   
    constructor(private actService: ActService,
                private $mdDialog: ng.material.IDialogService,
                private act?: ActViewModel,
                private eventId?: number) {
    }

    $onInit() {        
    }

    save() {
        this.actService.save(this.act)
            .then((updatedAct) => _.merge(this.act, updatedAct))
            .then(() => this.$mdDialog.hide(this.act));
    }

    cancel() {
         this.$mdDialog.cancel();
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/act-editor-modal/act-editor-modal.html',
    controller: ActEditorModalController,
    bindings: {
    }
}

export default options;
