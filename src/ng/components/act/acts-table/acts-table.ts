class ActsTableController implements angular.IComponentController {
    getActs: Function;
    edit: Function;

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
        edit: '&'
    }
}

export default options;
