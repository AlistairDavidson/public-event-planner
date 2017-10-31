import * as _ from 'lodash';

export class EpListController implements angular.IComponentController {
    rows: any[];
    onEdit: Function;
    onFavourite: Function;
    listItemTemplate: string;

    constructor(private $mdDialog: ng.material.IDialogService) {
    }

    $onInit() {
    }

    remove(ev: any, row: any) {
        let confirm = this.$mdDialog.confirm()
            .title(`Remove this FOO?`)
            .textContent(`You are removing FOO`)
            .targetEvent(ev)
            .ok('Remove')
            .cancel('Keep it');

        return this.$mdDialog.show(confirm).then(() => {            
            _.remove(this.rows, row);
        });
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/ep-list/ep-list.html',
    controller: EpListController,
    bindings: {
        rows: '=',
        onEdit: '&?',
        onFavourite: '&?',
        listItemTemplate: '='
    }
}

export default options;
