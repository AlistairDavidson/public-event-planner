import { MdSortDto } from '../../../../common/types';
import ActService from '../../../services/act-service';


class ActsPageController implements angular.IComponentController {    
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
    templateUrl: 'components/act/acts-page/acts-page.html',
    controller: ActsPageController,
    bindings: {}
}

export default options;
