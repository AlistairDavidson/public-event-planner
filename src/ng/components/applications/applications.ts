import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../common/models/act-application';
import { MdSortDto } from '../../../common/types';
import ApplicationService from '../../services/application-service';
import { ApplicationViewModel } from '../../services/application-service';


class ApplicationsController implements angular.IComponentController {    
    currentNavItem = 'applications_summary';

    constructor() {

    }

    $onInit() {
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/applications/applications.html',
    controller: ApplicationsController,
    bindings: {}
}

export default options;
