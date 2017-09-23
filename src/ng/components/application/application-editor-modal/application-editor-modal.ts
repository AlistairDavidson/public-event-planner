import ApplicationService from '../../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../../common/models/act-application';

export class ApplicationEditorModalController implements angular.IComponentController {
    static $inject = ['applicationService', '$mdDialog', 'application'];    

    constructor(private applicationService: ApplicationService,
                private $mdDialog: ng.material.IDialogService,
                private application?: ActApplicationDto) {
    }

    $onInit() {     
    }

    save() {
        this.applicationService.save(this.application)
            .then((updatedApplication) => this.application = updatedApplication)
            .then(() => this.$mdDialog.hide(this.application));
    }

    cancel() {
         this.$mdDialog.cancel();
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/application/application-editor-modal/application-editor-modal.html',
    controller: ApplicationEditorModalController,
    bindings: {
    }
}

export default options;
