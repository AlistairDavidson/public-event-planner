import { module, bootstrap, element } from 'angular';
import './services';
import './components';

module('event-planner', [ 'event-planner.components', 'event-planner.services', 'ui.router', 'ngCookies', 'templates', 'md.data.table' ])  
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