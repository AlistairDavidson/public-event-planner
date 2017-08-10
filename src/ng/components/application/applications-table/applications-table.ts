import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../../common/models/act-application';

class ApplicationsTableController implements angular.IComponentController {
    getApplications: Function;
    create: Function;

    constructor() {
    }

    $onInit() {
    }

    delete() {

    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/application/applications-table/applications-table.html',
    controller: ApplicationsTableController,
    bindings: {
        getApplications: '&',
        create: '&'
    }
}

export default options;
