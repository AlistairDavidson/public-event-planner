import { module } from 'angular';
import services from '../services';

import eventPlannerApp from './event-planner-app/event-planner-app';
import epTable from './ep-table/ep-table';

import actCard from './act/act-card/act-card';
import actEditorForm from './act/act-editor-form/act-editor-form';
import actEditorModal from './act/act-editor-modal/act-editor-modal';
import actSearch from './act/act-search/act-search';
import acts from './act/acts/acts';
import actsSummary from './act/acts-summary/acts-summary';
import actsTable from './act/acts-table/acts-table';

import applicationCard from './application/application-card/application-card';
import applicationEditorForm from './application/application-editor-form/application-editor-form';
import applicationEditorModal from './application/application-editor-modal/application-editor-modal';
import applications from './application/applications/applications';
import applicationsSummary from './application/applications-summary/applications-summary';
import applicationsTable from './application/applications-table/applications-table';

import bookingEditorForm from './booking/booking-editor-form/booking-editor-form';
import bookingEditorModal from './booking/booking-editor-modal/booking-editor-modal';
import bookingsEditor from './booking/bookings-editor/bookings-editor';
import bookingSearch from './booking/booking-search/booking-search';
import bookingStatusSelect from './booking/booking-status-select/booking-status-select';
import bookingSummary from './booking/booking-summary/booking-summary';

import contactEditorForm from './contact/contact-editor-form/contact-editor-form';
import contactEditorModal from './contact/contact-editor-modal/contact-editor-modal';
import contactSearch from './contact/contact-search/contact-search';
import actContactsEditor from './contact/act-contacts-editor/act-contacts-editor';

import eventSearch from './event/event-search/event-search';

import locationEditorForm from './location/location-editor-form/location-editor-form';
import locationEditorModal from './location/location-editor-modal/location-editor-modal';
import locationSearch from './location/location-search/location-search';

export default module('event-planner.components', [ 'event-planner.services', 'ngMaterial' ])
    .component('eventPlannerApp', eventPlannerApp)
    .component('epTable', epTable)

    .component('actCard', actCard)    
    .component('actEditorForm', actEditorForm)
    .component('actEditorModal', actEditorModal)
    .component('actSearch', actSearch)
    .component('acts', acts)
    .component('actsSummary', actsSummary)
    .component('actsTable', actsTable)

    .component('applicationsTable', applicationsTable)
    .component('applicationEditorForm', applicationEditorForm)
    .component('applicationEditorModal', applicationEditorModal)
    .component('applicationCard', applicationCard)
    .component('applicationsSummary', applicationsSummary)
    .component('applications', applications)
    
    .component('bookingEditorForm', bookingEditorForm)
    .component('bookingEditorModal', bookingEditorModal)
    .component('bookingsEditor', bookingsEditor)
    .component('bookingSearch', bookingSearch)
    .component('bookingStatusSelect', bookingStatusSelect)   
    .component('bookingSummary', bookingSummary)    

    .component('contactEditorForm', contactEditorForm)
    .component('contactEditorModal', contactEditorModal)
    .component('actContactsEditor', actContactsEditor)
    .component('contactSearch', contactSearch)

    .component('eventSearch', eventSearch)

    .component('locationSearch', locationSearch);