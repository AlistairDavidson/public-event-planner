import { module, bootstrap, element } from 'angular';
import './services';
import './components';
import ApplicationService from './services/application-service';
import { ApplicationViewModel } from './services/application-service';
import { ActDto } from '../common/models/act';
import ActService from './services/act-service';
import { ActViewModel } from './services/act-service';

module('event-planner', [ 'event-planner.components', 'event-planner.services', 'ui.router', 'ngCookies', 'templates', 'md.data.table' ])
    .config(['$mdIconProvider', ($mdIconProvider: ng.material.IIconProvider) => {
        $mdIconProvider
            .iconSet('community', 'mdi.svg');
    }])         
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider: ng.ui.IStateProvider,
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
                controller: ['applicationsData', function(applications: { data: ApplicationViewModel[] }) {
                    this.applications = applications.data;
                }],
                controllerAs: '$ctrl'
            })
            .state({
                name: 'root.applications.detail',
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
                controller: ['actsData', function(actsData: { data: ActViewModel[] }) {
                    this.acts = actsData.data;
                    console.log('route', this.acts, actsData);
                }],
                controllerAs: '$ctrl'
            })
            .state({
                name: 'root.acts.detail',
                url: '/detail',
                template:  `<acts-table                                
                                get-acts="$ctrl.actService.list(query)"
                                create="$ctrl.actService.create()">
                            </acts-table>`,
                controller: ['actService', function(actService: ActService) {
                    this.actService = actService;
                }],
                controllerAs: '$ctrl'
            });
    }])
    .controller('eventPlanner', () => {});

element(document).ready(() => { 
    bootstrap(document, ['event-planner', 'templates']);
});

