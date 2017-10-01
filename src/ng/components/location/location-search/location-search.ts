import { LocationDto } from '../../../../common/models/location';
import { LocationViewModel } from '../../../services/location-service';
import LocationService from '../../../services/location-service';

export class LocationSearchController implements angular.IComponentController {
    static $inject = ['locationService'];

    location: LocationViewModel;
    locationId: number;
    eventId: number;

    searchText: string;
    
    constructor(private locationService: LocationService) {
    }

    $onInit() {        
        if(!this.location && this.locationId) {
            this.locationService.get(this.eventId, false)
                .then(location => this.location = location);
        } 
    }

    edit(ev: ng.IAngularEvent) {
     /*   this.locationService.edit(ev)            
            .then(location => {
                this.location = location;
            });*/
    }

    search(searchText: string) {
        return this.locationService.list({
            order: 'name',
            limit: 25,
            page: 1,
            filter: searchText,
            eventId: this.eventId
        });
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/location/location-search/location-search.html',
    controller: LocationSearchController,
    bindings: {
        location: '=?',
        locationId: '=?',
        eventId: '='
    }
}

export default options;
