import { module } from 'angular';
import applicationService from './application-service';
import eventService from './event-service';
import actService from './act-service';

export default module('event-planner.services', [])
    .service('applicationService', applicationService)
    .service('actService', actService)
    .service('eventService', eventService);