import { module } from 'angular';
import applicationService from './application-service';
import eventService from './event-service';
import actService from './act-service';
import contactService from './contact-service';
import bookingService from './booking-service';
import locationService from './location-service';
import userService from './user-service';

export default module('event-planner.services', [])
    .service('applicationService', applicationService)
    .service('actService', actService)
    .service('contactService', contactService)
    .service('eventService', eventService)
    .service('bookingService', bookingService)
    .service('locationService', locationService)
    .service('userService', userService);