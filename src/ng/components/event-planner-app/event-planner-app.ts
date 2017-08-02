import EventService from '../../services/event-service';
import { EventDto } from '../../../common/models/event';

class EventPlannerAppController implements angular.IComponentController {
    static $inject = ['$window', '$mdSidenav', '$state', '$stateParams', 'eventService'];

    events: EventDto[];
    selectedEvent: number; 

    constructor(private $window: ng.IWindowService,
                private $mdSidenav: ng.material.ISidenavService,
                private $state: ng.ui.IStateService,
                private $stateParams: ng.ui.IStateParamsService,
                private eventService: EventService) {



    }

    $onInit() {
        this.selectedEvent = this.$stateParams.event;

        this.eventService.list()
            .then(eventData => this.events = eventData.events)
            .then(() => {
                if(!this.selectedEvent) {
                    this.selectedEvent = this.events[0].id;
                    this.switchEvent(); 
                }
            });
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
            state = 'root.home';
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
