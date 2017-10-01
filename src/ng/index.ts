import { module, bootstrap, element } from 'angular';

import './services';
import './components';
import routes from './routes';

module('event-planner', [ 'event-planner.components', 'event-planner.services', 'ui.router', 'ngCookies', 'templates', 'md.data.table' ])
    .config(['$mdIconProvider', ($mdIconProvider: ng.material.IIconProvider) => {
        $mdIconProvider
            .iconSet('community', 'mdi.svg');
    }])         
    .config(routes)
    .controller('eventPlanner', () => {});

element(document).ready(() => { 
    bootstrap(document, ['event-planner', 'templates']);
});

