import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../../common/models/act-application';
import { MdSortDto } from '../../../../common/types';
import ApplicationService from '../../../services/application-service';
import { ApplicationViewModel } from '../../../services/application-service';


class ApplicationsController implements angular.IComponentController {    
    static $inject = ['$state'];

    constructor(private $state: ng.ui.IStateService) {

    }

    get currentNavItem() {
        if(this.$state && this.$state.current && this.$state.current.name) {
            return this.$state.current.name;
        }

        return 'home';
    }


    set currentNavItem(value: string) {
        // do nothing! :)
        // state changes happen through ui-sref links
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/application/applications/applications.html',
    controller: ApplicationsController,
    bindings: {}
}

export default options;
