import ApplicationService from '../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../common/models/act-application';
import { MdSortDto } from '../../../common/types';

class EpTableController implements angular.IComponentController {
    static $inject = ['$scope']

    title: string;

    count: number;
    data: any[] = [];
    selected: any[] = [];

    onList: Function;
    onCreate: Function;

    loading: angular.IPromise<any>;
    form: ng.IFormController;   

    query: MdSortDto = {
        order: 'name',
        limit: 100,
        page: 1,
        filter: ''
    }

    filter: {
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
       return this.loading = this.onList({ query: this.query })
            .then((newData: { count: number, data: any[]}) => {
                this.data = newData.data;
                this.count = newData.count
                return newData;
            });            
    }

    create() {
        return this.loading = this.onCreate()
            .then(() => this.get());
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
        onCreate: '&',
        headerTemplate: '=',
        cellTemplate: '='        
    }
}

export default options;
