import ApplicationService from './services/application-service';
import { ApplicationViewModel } from './services/application-service';
import { ActDto } from '../common/models/act';
import ActService from './services/act-service';
import { ActViewModel } from './services/act-service';

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
                            get-applications="$ctrl.applicationService.list(query)"
                            edit="$ctrl.applicationService.edit($event)">
                        </applications-table>`,
            controller: ['applicationService', function(applicationService: ApplicationService) {
                this.applicationService = applicationService;
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
                            get-acts="$ctrl.actService.list(query)"
                            edit="$ctrl.actService.edit($event)">
                        </acts-table>`,
            controller: ['actService', function(actService: ActService) {
                this.actService = actService;
            }],
            controllerAs: '$ctrl'
        })
        .state({
            name: 'root.act',
            url: '/act',            
            template: `<ui-view></ui-view>`,
            abstract: true
        })
        .state({
            name: 'root.act.edit',
            url: '/edit/{act}',
            template:  `<act-editor act-id="$ctrl.stateParams.act"></act-editor>`,
            controller: ['$stateParams', function($stateParams: ng.ui.IStateParamsService) {
                this.$stateParams = $stateParams;
            }],
            controllerAs: '$ctrl'
        });
}]