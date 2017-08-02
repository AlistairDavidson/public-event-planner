import { module } from 'angular';
import applicationService from './application-service';
import eventService from './event-service';

export default module('event-planner.services', [])
    .service('applicationService', applicationService)
    .service('eventService', eventService);