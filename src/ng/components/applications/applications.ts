import ApplicationService from '../../services/application-service';
import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../../common/models/act-application';
import { MdSortDto } from '../../../common/types';
import { element } from 'angular';
import { ApplicationEditorController } from '../application-editor/application-editor';

class ApplicationsController implements angular.IComponentController {
    static $inject = ['applicationService', '$mdDialog'];

    constructor(private applicationService: ApplicationService,
                private $mdDialog: ng.material.IDialogService) {
    }

    $onInit() {
    }

    getApplications(query: MdSortDto) {
       return this.applicationService.list(query)
            .then(applicationsData => {
                let applications = this.processApplicationsList(applicationsData.applications);
                let count = applicationsData.count
                return {
                    count: count,
                    data: applications
                };
            });            
    }

    processApplicationsList(applicationsData: ActApplicationDto[]) {
       let applications = applicationsData
            .map((applicationData) => {
                let details = applicationData.details as ApplicationViewModel;
                details.id = applicationData.id;
                details.createdAt = new Date(Date.parse(applicationData.createdAt));
                details.updatedAt = new Date(Date.parse(applicationData.updatedAt));
                return details;
            });
        
        return applications;
    }

    create(ev: ng.IAngularEvent) {
        this.$mdDialog.show({
            controller: ApplicationEditorController,
            templateUrl: 'components/application-editor/application-editor.html',
            parent: element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            controllerAs: '$ctrl'
        } as any);
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
    templateUrl: 'components/applications/applications.html',
    controller: ApplicationsController,
    bindings: {}
}

export default options;
