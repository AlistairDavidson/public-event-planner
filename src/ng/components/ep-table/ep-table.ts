import ApplicationService from '../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../common/models/act-application';
import { MdSortDto } from '../../../common/types';
import { element } from 'angular';

class EpTableController implements angular.IComponentController {
    static $inject = ['$scope']

    title: string;

    count: number;
    rows: any[] = [];
    selected: any[] = [];

    onList: Function;
    onEdit: Function;

    loading: angular.IPromise<any>;
    form: ng.IFormController;   

    query: MdSortDto = {
        order: 'name',
        limit: 100,
        page: 1,
        filter: ''
    }

    filter = {
        show: false,
        options: {
            debounce: 300
        }
    }

    constructor(private $scope: ng.IScope) {
        this.get = this.get.bind(this);
    }

    $onInit() {
        this.get();

        this.$scope.$watch('$ctrl.query.filter', _ => this.get() );
    }

    get() {
        console.log('ep-table:', this.query)
       return this.loading = this.onList({ query: this.query })
            .then((newData: { count: number, rows: any[]}) => {
                this.rows = newData.rows;
                this.count = newData.count
                return newData;
            });            
    }

    edit(ev: ng.IAngularEvent) {
        return this.loading = this.onEdit()
            .then(() => this.get());
    }

    showFilter() {
        this.filter.show = true;
        //(element('#table-filter') as any).focus();
    }

    hideFilter() {
        this.filter.show = false;
        this.query.filter = '';
        
        if(this.form.$dirty) {
            this.form.$setPristine();
        }
    }

    delete() {

    }
}

interface ApplicationViewModel extends RawApplicationDto {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/ep-table/ep-table.html',
    controller: EpTableController,
    bindings: {
        title: '=',
        onList: '&',
        onEdit: '&',
        headerTemplate: '=',
        cellTemplate: '='        
    }
}

export default options;
