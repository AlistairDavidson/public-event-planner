import ApplicationService from '../../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../../common/models/act-application';

export class ApplicationEditorFormController implements angular.IComponentController {
    application?: ActApplicationDto;

    constructor() {
    }

    $onInit() {
        if(!this.application) {
            this.application = {
                details: {}
            }
        }
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/application/application-editor-form/application-editor-form.html',
    controller: ApplicationEditorFormController,
    bindings: {
        application: '=?'
    }
}

export default options;
