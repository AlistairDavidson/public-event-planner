import ApplicationService from '../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../common/models/act-application';
import { MdSortDto } from '../../../common/types';

class ApplicationsController implements angular.IComponentController {
    static $inject = ['applicationService'];

    query: MdSortDto = {
        order: 'name',
        limit: 100,
        page: 1
    }
  
    count: number;
    applications: ApplicationViewModel[];
    selectedApplications: ApplicationViewModel[];

    loading: angular.IPromise<ActApplicationsDto>;
    
    constructor(private applicationService: ApplicationService) {

    }

    $onInit() {
        this.getApplications();
    }

    getApplications() {

       return this.loading = this.applicationService.list(this.query)
            .then(applicationsData => {
                this.setApplicationsList(applicationsData.applications);
                this.count = applicationsData.count
                return applicationsData;
            });            
    }
    
    setApplicationsList(applicationsData: ActApplicationDto[]) {
        this.applications = applicationsData
            .map((applicationData) => {
                let details = applicationData.details as ApplicationViewModel;
                details.id = applicationData.id;
                details.createdAt = applicationData.createdAt;
                details.updatedAt = applicationData.updatedAt;
                return details;
            });
        
        return this.applications;
    }
}

interface ApplicationViewModel extends RawApplicationDto {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/applications/applications.html',
    controller: ApplicationsController,
    bindings: {}
}

export default options;
