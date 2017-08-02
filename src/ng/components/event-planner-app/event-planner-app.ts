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
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/event-planner-app/event-planner-app.html',
    controller: EventPlannerAppController,
    bindings: {}
}

export default options;
