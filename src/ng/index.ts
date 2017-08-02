import { module, bootstrap, element } from 'angular';
import './services';
import './components';
import ApplicationService from './services/application-service';
import { ApplicationViewModel } from './services/application-service';

module('event-planner', [ 'event-planner.components', 'event-planner.services', 'ui.router', 'ngCookies', 'templates', 'md.data.table' ])
    .config(['$mdIconProvider', ($mdIconProvider: ng.material.IIconProvider) => {
        $mdIconProvider
            .iconSet('community', 'mdi.svg');
    }])         
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdIconProvider',
        function($stateProvider: ng.ui.IStateProvider,
                 $urlRouterProvider: ng.ui.IUrlRouterProvider,
                 $locationProvider: ng.ILocationProvider,
                 $mdIconProvider: ng.material.IIconProvider) {

        $mdIconProvider
            .iconSet('community', 'mdi.svg');

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');
        
        $stateProvider           
            .state({
                name: 'home',
                url: '/',
                template:  `<dashboard>
                                <md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>
                            </dashboard>`
            })
            .state({
                name: 'applications',
                url: '/applications',
                template:  `<applications>
                                <md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>
                            </applications>`
            })
            .state({
                name: 'applications.summary',
                url: '/summary',
                template:  `<applications-summary
                                applications="$ctrl.applications">
                            </applications-summary>`,
                resolve: {
                    applicationsData: ['applicationService', (applicationService: ApplicationService) => applicationService.list()]
                },                     
                controller: ['applicationsData', function(applications: { data: ApplicationViewModel[] }) {
                    this.applications = applications.data;
                }],
                controllerAs: '$ctrl'
            })
            .state({
                name: 'applications.detail',
                url: '/detail',
                template:  `<applications-table                                
                                get-applications="$ctrl.applicationService.list(query)"
                                create="$ctrl.applicationService.create()">
                            </applications-table>`,
                controller: ['applicationService', function(applicationService: ApplicationService) {
                    this.applicationService = applicationService;
                }],
                controllerAs: '$ctrl'
            })
            .state({
                name: 'acts',
                url: '/acts',
                template:  `<acts>
                                <md-progress-circular md-mode="indeterminate" class="loading"></md-progress-circular>
                            </acts>`
            });
    }])
    .controller('eventPlanner', () => {});

element(document).ready(() => { 
    bootstrap(document, ['event-planner', 'templates']);
});

