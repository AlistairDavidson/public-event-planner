import { EventDto } from '../../../../common/models/event';
import { EventViewModel } from '../../../services/event-service';
import EventService from '../../../services/event-service';

export class EventSearchController implements angular.IComponentController {
    static $inject = ['eventService'];

    event: EventViewModel;
    eventId: number;

    searchText: string;

    constructor(private eventService: EventService) {
    }

    $onInit() {       
        if(!this.event && this.eventId) {
            this.eventService.get(this.eventId, false)
                .then(event => this.event = event);
        } 
    }

    edit(ev: ng.IAngularEvent) {
     /*   this.eventService.edit(ev)            
            .then(event => {
                this.event = event;
            });*/
    }

    search(searchText: string) {
        return this.eventService.list({
            order: 'name',
            limit: 25,
            page: 1,
            filter: searchText
        });
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/event/event-search/event-search.html',
    controller: EventSearchController,
    bindings: {
        event: '=?',
        eventId: '=?'
    }
}

export default options;
