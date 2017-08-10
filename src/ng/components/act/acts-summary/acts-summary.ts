import { ActViewModel } from '../../../services/act-service';
import { MdSortDto } from '../../../../common/types';

class ActsSummaryController implements angular.IComponentController {
    getActs: Function;
    create: Function;

    acts: ActViewModel[];

    constructor() {

    }

    $onInit() {
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/acts-summary/acts-summary.html',
    controller: ActsSummaryController,
    bindings: {
        getActs: '&',
        create: '&',
        acts: '='
    }
}

export default options;
