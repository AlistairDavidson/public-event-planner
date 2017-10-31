import { UserDto, UsersDto } from '../../common/models/user';
import { BookingDto } from '../../common/models/booking';
import { TimeslotDto } from '../../common/models/timeslot';
import { queryToRequest } from '../helpers/network';
import settings from '../settings';
import { MdSortDto } from '../../common/types';
import { element } from 'angular';
//import { UserEditorModalController } from '../components/user/user-editor-modal/user-editor-modal';
import * as _ from 'lodash';

export default class UserService {
    static $inject = ['$http', '$httpParamSerializer', '$q', '$mdDialog'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer,
                private $q: ng.IQService,
                private $mdDialog: ng.material.IDialogService) {

    }

    list(query?: MdSortDto) {
        let url = `${settings.api}/user/list`;

        if(query) {
            let listQuery = queryToRequest(query);
            let queryString = this.$httpParamSerializer(listQuery);

            url = `${url}?${queryString}`                
        }

        return this.$http.get(url)
            .then(response => {
                let usersResponse = response.data as UsersDto;
                usersResponse.rows = usersResponse.rows.map(user => new UserViewModel(user));

                return usersResponse;
            });            
    }

    get(id: number, full: boolean) {
        return this.$http.get(`${settings.api}/user/get?id=${id}`)
            .then(response => new UserViewModel(response.data as UserDto));
    }

    save(data: UserDto) {
        return this.$http.post(`${settings.api}/user/save`, data)
            .then(response => new UserViewModel(response.data as UserDto));
    }

    delete(data: UserDto) {
        return this.$http.post(`${settings.api}/user/delete`, { id: data.id })
            .then(response => new UserViewModel(response.data as UserDto));
    }         

    /*edit(ev: ng.IAngularEvent) {
        return this.$mdDialog.show({
            controller: UserEditorModalController,
            templateUrl: 'components/user/user-editor-modal/user-editor-modal.html',
            parent: element(document.body),
            targetUser: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            bindToController: true,
            skipHide: true,
            controllerAs: '$ctrl'
        } as any);
    }*/
}

export class UserViewModel implements UserDto {
    constructor(user?: UserDto) {
        if(user) {
            _.merge(this, user);
        }
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;

    username?: string;
    password?: string;
    uuid?: string;
}