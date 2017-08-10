import { ActViewModel } from '../../../services/act-service';

export class ActCardController implements angular.IComponentController {
    act?: ActViewModel;

    constructor() {
    }

    $onInit() {

    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/act-card/act-card.html',
    controller: ActCardController,
    bindings: {
        act: '='
    }
}

export default options;
