import { module } from 'angular';
import services from '../services';

import eventPlannerApp from './event-planner-app/event-planner-app';
import applications from './applications/applications';
import acts from './acts/acts';
import table from './table/table';

export default module('event-planner.components', [ 'event-planner.services', 'ngMaterial' ])
    .component('eventPlannerApp', eventPlannerApp)
    .component('applications', applications)
    .component('acts', acts)
    .component('table', table);