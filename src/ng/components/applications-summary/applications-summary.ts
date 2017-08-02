import { ApplicationViewModel } from '../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../common/models/act-application';
import { MdSortDto } from '../../../common/types';

class ApplicationsSummaryController implements angular.IComponentController {
    getApplications: Function;
    create: Function;

    applications: ApplicationViewModel[];

    constructor() {

    }

    $onInit() {
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/applications-summary/applications-summary.html',
    controller: ApplicationsSummaryController,
    bindings: {
        getApplications: '&',
        create: '&',
        applications: '='
    }
}

export default options;
