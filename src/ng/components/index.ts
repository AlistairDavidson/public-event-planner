import { module } from 'angular';
import services from '../services';

import eventPlannerApp from './event-planner-app/event-planner-app';
import epTable from './ep-table/ep-table';
import epList from './ep-list/ep-list';

import actCard from './act/act-card/act-card';
import actEditorForm from './act/act-editor-form/act-editor-form';
import actSearch from './act/act-search/act-search';
import actsPage from './act/acts-page/acts-page';
import actsSummary from './act/acts-summary/acts-summary';
import actsTable from './act/acts-table/acts-table';

import applicationCard from './application/application-card/application-card';
import applicationEditorForm from './application/application-editor-form/application-editor-form';
import applicationEditorModal from './application/application-editor-modal/application-editor-modal';
import applicationsPage from './application/applications-page/applications-page';
import applicationsSummary from './application/applications-summary/applications-summary';
import applicationsTable from './application/applications-table/applications-table';

import bookingEditorForm from './booking/booking-editor-form/booking-editor-form';
import bookingsEditor from './booking/bookings-editor/bookings-editor';
import bookingSearch from './booking/booking-search/booking-search';
import bookingStatusSelect from './booking/booking-status-select/booking-status-select';
import bookingSummary from './booking/booking-summary/booking-summary';

import contactEditorForm from './contact/contact-editor-form/contact-editor-form';
import actContactEditorForm from './contact/act-contact-editor-form/act-contact-editor-form';
import contactSearch from './contact/contact-search/contact-search';
import actContactsEditor from './contact/act-contacts-editor/act-contacts-editor';

import eventSearch from './event/event-search/event-search';

import locationEditorForm from './location/location-editor-form/location-editor-form';
import locationEditorModal from './location/location-editor-modal/location-editor-modal';
import locationSearch from './location/location-search/location-search';

export default module('event-planner.components', [ 'event-planner.services', 'ngMaterial' ])
    .component('eventPlannerApp', eventPlannerApp)
    .component('epTable', epTable)
    .component('epList', epList)

    .component('actCard', actCard)    
    .component('actEditorForm', actEditorForm)    
    .component('actSearch', actSearch)
    .component('actsPage', actsPage)
    .component('actsSummary', actsSummary)
    .component('actsTable', actsTable)

    .component('applicationsTable', applicationsTable)
    .component('applicationEditorForm', applicationEditorForm)
    .component('applicationEditorModal', applicationEditorModal)
    .component('applicationCard', applicationCard)
    .component('applicationsSummary', applicationsSummary)
    .component('applicationsPage', applicationsPage)
    
    .component('bookingEditorForm', bookingEditorForm)
    .component('bookingsEditor', bookingsEditor)
    .component('bookingSearch', bookingSearch)
    .component('bookingStatusSelect', bookingStatusSelect)   
    .component('bookingSummary', bookingSummary)    

    .component('contactEditorForm', contactEditorForm)
    .component('actContactEditorForm', actContactEditorForm)
    .component('actContactsEditor', actContactsEditor)
    .component('contactSearch', contactSearch)

    .component('eventSearch', eventSearch)

    .component('locationSearch', locationSearch);