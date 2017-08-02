import { module } from 'angular';
import services from '../services';

import eventPlannerApp from './event-planner-app/event-planner-app';
import applicationsTable from './applications-table/applications-table';
import applicationEditor from './application-editor/application-editor';
import applicationCard from './application-card/application-card';
import applicationsSummary from './applications-summary/applications-summary';
import applications from './applications/applications';
import acts from './acts/acts';
import epTable from './ep-table/ep-table';


export default module('event-planner.components', [ 'event-planner.services', 'ngMaterial' ])
    .component('eventPlannerApp', eventPlannerApp)
    .component('epTable', epTable)
    .component('applicationsTable', applicationsTable)
    .component('applicationEditor', applicationEditor)
    .component('applicationCard', applicationCard)
    .component('applicationsSummary', applicationsSummary)
    .component('applications', applications)
    .component('acts', acts);