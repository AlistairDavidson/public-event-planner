import { module } from 'angular';
import applicationService from './application-service';

export default module('event-planner.services', [])
    .service('applicationService', applicationService);