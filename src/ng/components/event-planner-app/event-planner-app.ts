import EventService from '../../services/event-service';
import { EventDto } from '../../../common/models/event';

class EventPlannerAppController implements angular.IComponentController {
    static $inject = ['$window', '$mdSidenav', '$state', 'eventService'];

    events: EventDto[];
    selectedEvent: number; 

    constructor(private $window: ng.IWindowService,
                private $mdSidenav: ng.material.ISidenavService,
                private $state: ng.ui.IStateService,
                private eventService: EventService) {



    }

    $onInit() {
        this.eventService.list()
            .then(eventData => this.events = eventData.events);
    }

    openSidenav() {
        this.$window.scrollTo(0, 0);
        this.$mdSidenav('left').open();
    }

    closeSidenav() {
        this.$mdSidenav('left').close();
    }

    switchEvent() {
        console.log('Switching to', this.selectedEvent);
        let state = this.currentNavItem;
        if(state == 'default') {
            state = 'root';
        }
        this.$state.go(state, { event: this.selectedEvent });
    }

    get currentNavItem() {
        if(this.$state && this.$state.current && this.$state.current.name) {
            return this.$state.current.name;
        }

        return 'home';
    }

    set currentNavItem(value: string) {
        // do nothing! :)
        // state changes happen through ui-sref links
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/event-planner-app/event-planner-app.html',
    controller: EventPlannerAppController,
    bindings: {}
}

export default options;
