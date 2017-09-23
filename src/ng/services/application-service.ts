import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../common/models/act-application';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto, ListDto } from '../../common/types';
import { element } from 'angular';
import { ApplicationEditorModalController } from '../components/application/application-editor-modal/application-editor-modal';

export default class ApplicationService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog', '$stateParams'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService,
                private $stateParams: ng.ui.IStateParamsService) {

    }

    list(query?: MdSortDto) {
        let queryString: string;

        if(query) {
           let listQuery = queryToRequest(query);
           listQuery.eventId = this.$stateParams.event;
           queryString = this.$httpParamSerializer(listQuery);         
        } else {
            queryString = this.$httpParamSerializer({
                eventId: this.$stateParams.event
            });
        }    

        let url = `${settings.api}/application/list?${queryString}`;

        return this.$http.get(url)
            .then(response => (response.data as ActApplicationsDto))
            .then(applicationsData => {                 
                return {
                    count: applicationsData.count,
                    rows: this.processApplicationsList(applicationsData.rows)
                };
            });    
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/application/get?id=${id}`)
            .then(response => (response.data as ActApplicationDto));
    }

    save(data: ActApplicationDto) {
        data.EventId = this.$stateParams.event;

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

    edit(ev: ng.IAngularEvent, application?: ApplicationViewModel): ng.IPromise<ApplicationViewModel> {
        return this.$mdDialog.show({
            controller: ApplicationEditorModalController,
            templateUrl: 'components/application/application-editor-modal/application-editor-modal.html',
            parent: element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            controllerAs: '$ctrl',
            skipHide: true,
            autoWrap: true,
            resolve: {
                'application': () => application
            }
        } as any);
    }
}

export interface ApplicationViewModel extends RawApplicationDto {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}