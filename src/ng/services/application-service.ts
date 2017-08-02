import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../common/models/act-application';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
import { ApplicationEditorController } from '../components/application-editor/application-editor';

export default class ApplicationService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog', '$stateParams'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService,
                private $stateParams: ng.ui.IStateParamsService) {

    }

    list(query: MdSortDto = {}) {
        query.eventId = this.$stateParams.event;

        let listQuery = queryToRequest(query);
        let queryString = this.$httpParamSerializer(listQuery);            
        let url = `${settings.api}/application/list?${queryString}`;

        return this.$http.get(url)
            .then(response => (response.data as ActApplicationsDto))
            .then(applicationsData => {
                let applications = this.processApplicationsList(applicationsData.applications);
                let count = applicationsData.count
                return {
                    count: count,
                    data: applications
                };
            });    
    }

    get(id: number) {
        return this.$http.get(`${settings.api}/application/get?id=${id}`)
            .then(response => (response.data as ActApplicationDto));
    }

    save(data: ActApplicationDto) {
        return this.$http.post(`${settings.api}/application/save`, data)
            .then(response => (response.data as ActApplicationDto));
    }

    delete(data: ActApplicationDto) {
        return this.$http.post(`${settings.api}/application/delete`, { id: data.id })
            .then(response => (response.data as ActApplicationDto));
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
        return this.$mdDialog.show({
            controller: ApplicationEditorController,
            templateUrl: 'components/application-editor/application-editor.html',
            parent: element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl'
        } as any);
    }
}

export interface ApplicationViewModel extends RawApplicationDto {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}