class ActsTableController implements angular.IComponentController {
    getActs: Function;
    create: Function;

    constructor() {
    }

    $onInit() {
    }

    delete() {

    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/acts-table/acts-table.html',
    controller: ActsTableController,
    bindings: {
        getActs: '&',
        create: '&'
    }
}

export default options;
