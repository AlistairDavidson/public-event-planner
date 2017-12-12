import { module, bootstrap, element } from 'angular';
import contenteditable from './helpers/contenteditable-directive';

import './services';
import './components';
import routes from './routes';

module('event-planner', [ 'event-planner.components', 'event-planner.services', 'ui.router', 'ngCookies', 'templates', 'md.data.table' ])
    .config(['$httpProvider', function ($httpProvider: ng.IHttpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])
    .config(['$mdIconProvider', ($mdIconProvider: ng.material.IIconProvider) => {
        $mdIconProvider
            .iconSet('community', 'mdi.svg');
    }])         
    .config(routes)
    .controller('eventPlanner', () => {})
    .directive('contenteditable', contenteditable);

element(document).ready(() => { 
    bootstrap(document, ['event-planner', 'templates'], { strictDi: true });
});

