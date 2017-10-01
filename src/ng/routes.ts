import ApplicationService from './services/application-service';
import { ApplicationViewModel } from './services/application-service';
import { ActDto, ActsDto } from '../common/models/act';
import ActService from './services/act-service';
import { ActViewModel } from './services/act-service';
import { MdSortDto } from '../common/types';

export default [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
function(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $locationProvider: ng.ILocationProvider) {


    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider                       
        .state({
            name: 'default',
            url: '/',
            template: `<md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>`
        })
        .state({
            name: 'root',
            url: '/{event}',
            template: `<ui-view></ui-view>`,
            abstract: true
        })

        .state({
            name: 'root.home',
            url: '/home',
            template:  `<dashboard>
                            <md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>
                        </dashboard>`
        })

        .state({
            name: 'root.applications',
            url: '/applications',
            template:  `<applications>
                            <md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>
                        </applications>`
        })
        .state({
            name: 'root.applications.summary',
            url: '/summary',
            template:  `<applications-summary
                            applications="$ctrl.applications">
                        </applications-summary>`,
            resolve: {
                applicationsData: ['applicationService', (applicationService: ApplicationService) => applicationService.list()]
            },                     
            controller: ['applicationsData', function(applicationsData: { rows: ApplicationViewModel[] }) {
                this.applications = applicationsData.rows;
            }],
            controllerAs: '$ctrl'
        })
        .state({
            name: 'root.applications.detail',
            url: '/detail',
            template:  `<applications-table                                
                            get-applications="$ctrl.getApplications(query)"
                            edit="$ctrl.applicationService.edit($event)">
                        </applications-table>`,
            controller: ['applicationService', function(applicationService: ApplicationService) {
                this.applicationService = applicationService;
                this.getApplications = (query: MdSortDto) => {
                    applicationService.list(query)
                        .then(acts => acts.rows);
                }
            }],
            controllerAs: '$ctrl'
        })

        .state({
            name: 'root.acts',
            url: '/acts',
            template:  `<acts>
                            <md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>
                        </acts>`
        })
        .state({
            name: 'root.acts.summary',
            url: '/summary',
            template:  `<acts-summary
                            acts="$ctrl.acts">
                        </acts-summary>`,
            resolve: {
                actsData: ['actService', (actService: ActService) => actService.list()]
            },                     
            controller: ['actsData', function(actsData: { rows: ActViewModel[] }) {
                this.acts = actsData.rows;                    
            }],
            controllerAs: '$ctrl'
        })
        .state({
            name: 'root.acts.detail',
            url: '/detail',
            template:  `<acts-table                                
                            get-acts="$ctrl.getActs(query)"
                            edit="$ctrl.actService.edit($event)">
                        </acts-table>`,
            controller: ['actService', function(actService: ActService) {
                this.actService = actService;
                this.getActs = (query: MdSortDto) => {
                    actService.list(query)
                        .then(acts => acts.rows);
                }
            }],
            controllerAs: '$ctrl'
        })
        .state({
            name: 'root.act',
            url: '/act/{act}',
            template:  `<act-editor act-id="$ctrl.$stateParams.act" event-id="$ctrl.$stateParams.event"></act-editor>`,
            controller: ['$stateParams', function($stateParams: ng.ui.IStateParamsService) {
                this.$stateParams = $stateParams;
                console.log('Editing act:' + this.$stateParams.act);
            }],
            controllerAs: '$ctrl'
        });
}]