class EventPlannerAppController implements angular.IComponentController {
    static $inject = ['$window', '$mdSidenav', '$state'];

    constructor(private $window: ng.IWindowService,
                private $mdSidenav: ng.material.ISidenavService,
                private $state: ng.ui.IStateService) {

    }

    openSidenav() {
        this.$window.scrollTo(0, 0);
        this.$mdSidenav('left').open();
    }

    closeSidenav() {
        this.$mdSidenav('left').close();
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
