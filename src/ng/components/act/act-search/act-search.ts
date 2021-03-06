import { ActDto } from '../../../../common/models/act';
import { ActViewModel } from '../../../services/act-service';
import ActService from '../../../services/act-service';

export class ActSearchController implements angular.IComponentController {
    static $inject = ['actService'];
 
    act: ActViewModel;
    actId: number;

    searchText: string;

    constructor(private actService: ActService) {
    }

    $onInit() {
        if(!this.act && this.actId) {
            this.actService.get(this.actId, false)
                .then(act => this.act = act);
        }
        
        if(this.act) {
            this.actId = this.act.id;
        }
    }

    edit(ev: ng.IAngularEvent) {
       
    }

    search(searchText: string) {
        return this.actService.list({
            order: 'name',
            limit: 25,
            page: 1,
            filter: searchText
        })
        .then(acts => acts.rows);
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/act/act-search/act-search.html',
    controller: ActSearchController,
    bindings: {
        act: '=?',
        actId: '=?'
    }
}

export default options;
