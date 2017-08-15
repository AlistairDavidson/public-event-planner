import { ActViewModel } from '../../../services/act-service';
import { MdSortDto } from '../../../../common/types';

class ActsSummaryController implements angular.IComponentController {
    getActs: Function;
    create: Function;

    acts: ActViewModel[];

    constructor() {

    }

    $onInit() {
        console.log('summary', this.acts);
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/acts-summary/acts-summary.html',
    controller: ActsSummaryController,
    bindings: {
        getActs: '&',
        create: '&',
        acts: '='
    }
}

export default options;
