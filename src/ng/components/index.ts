import { module } from 'angular';
import services from '../services';

import eventPlannerApp from './event-planner-app/event-planner-app';
import actsTable from './act/acts-table/acts-table';
import actEditor from './act/act-editor/act-editor';
import actCard from './act/act-card/act-card';
import actsSummary from './act/acts-summary/acts-summary';
import applicationsTable from './application/applications-table/applications-table';
import applicationEditor from './application/application-editor/application-editor';
import applicationCard from './application/application-card/application-card';
import applicationsSummary from './application/applications-summary/applications-summary';
import applications from './application/applications/applications';
import acts from './act/acts/acts';
import epTable from './ep-table/ep-table';


export default module('event-planner.components', [ 'event-planner.services', 'ngMaterial' ])
    .component('eventPlannerApp', eventPlannerApp)
    .component('epTable', epTable)
    .component('actsTable', actsTable)
    .component('actEditor', actEditor)
    .component('actCard', actCard)
    .component('actsSummary', actsSummary)
    .component('EactventsTable', applicationsTable)
    .component('applicationEditor', applicationEditor)
    .component('applicationCard', applicationCard)
    .component('applicationsSummary', applicationsSummary)
    .component('applications', applications)
    .component('acts', acts);