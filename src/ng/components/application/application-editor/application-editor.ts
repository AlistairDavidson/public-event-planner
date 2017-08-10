import ApplicationService from '../../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../../common/models/act-application';

export class ApplicationEditorController implements angular.IComponentController {
    static $inject = ['applicationService', '$mdDialog'];

    application?: ActApplicationDto;

    constructor(private applicationService: ApplicationService,
                private $mdDialog: ng.material.IDialogService) {
    }

    $onInit() {
        if(!this.application) {
            this.application = {
                details: {}
            }
        }
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
    templateUrl: 'components/application/application-editor/application-editor.html',
    controller: ApplicationEditorController,
    bindings: {
        application: '=?'
    }
}

export default options;
