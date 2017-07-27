class ApplicationsController implements angular.IComponentController {
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
