import { ApplicationViewModel } from '../../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../../common/models/act-application';

export class ApplicationCardController implements angular.IComponentController {
    application?: ApplicationViewModel;

    constructor() {
    }

    $onInit() {

    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/application/application-card/application-card.html',
    controller: ApplicationCardController,
    bindings: {
        application: '='
    }
}

export default options;
