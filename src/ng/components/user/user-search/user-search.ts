import { UserDto } from '../../../../common/models/user';
import { UserViewModel } from '../../../services/user-service';
import UserService from '../../../services/user-service';

export class UserSearchController implements angular.IComponentController {
    static $inject = ['userService'];

    user: UserViewModel;
    userId: number;

    searchText: string;

    constructor(private userService: UserService) {
    }

    $onInit() {
        if(!this.user && this.userId) {
            this.userService.get(this.userId, false)
                .then(user => this.user = user);
        }         
    }

   /* edit(ev: ng.IAngularEvent) {
        this.userService.edit(ev)            
            .then(user => {
                this.user = user;
            });
    }*/

    search(searchText: string) {
        return this.userService.list({
            order: 'name',
            limit: 25,
            page: 0,
            filter: searchText
        });
    }
}

let options: angular.IComponentOptions = {
    templateUrl: 'components/user/user-search/user-search.html',
    controller: UserSearchController,
    bindings: {
        user: '=?',
        userId: '=?'
    }
}

export default options;
