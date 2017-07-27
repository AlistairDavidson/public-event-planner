import { module } from 'angular';
import * as services from '../services';

import eventPlannerApp from './event-planner-app/event-planner-app';
import applications from './applications/applications';
import acts from './acts/acts';

module('event-planner.components', [ 'ngMaterial' ])
    .component('eventPlannerApp', eventPlannerApp)
    .component('applications', applications)
    .component('acts', acts); 