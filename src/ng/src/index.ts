import { module, bootstrap, element } from 'angular';
import './components';

module('event-planner', [ 'event-planner.components', 'ui.router', 'ngCookies' ])  
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider: ng.ui.IStateProvider,
                 $urlRouterProvider: ng.ui.IUrlRouterProvider,
                 $locationProvider: ng.ILocationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider           
            .state({
                name: 'home',
                url: '/',
                template: `<home></home>`
            })
    }])
    .controller('eventPlanner', () => {});

element(document).ready(() => { 
    bootstrap(document, ['event-planner', 'templates']);
});