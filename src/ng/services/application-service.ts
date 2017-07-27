import { ActApplicationDto, RawApplicationDto, ActApplicationsDto } from '../../common/models/act-application';
import { queryToRequest } from './helper';
import settings from '../settings';
import { MdSortDto } from '../../common/types';

export default class ApplicationService {
    static $inject = ['$http', '$httpParamSerializer'];

    constructor(private $http: ng.IHttpService,
                private $httpParamSerializer: ng.IHttpParamSerializer) {

    }

    list(query: MdSortDto) {
        let listQuery = queryToRequest(query);
        let queryString = this.$httpParamSerializer(listQuery);

        return this.$http.get(`${settings.api}/application/list?${queryString}`)
            .then(response => (response.data as ActApplicationsDto));
    }

    get(id: number) {
        return this.$http.get(`${settings.api}/application/get?id=${id}`)
            .then(response => (response.data as ActApplicationDto));
    }

    save(data: ActApplicationDto) {
        return this.$http.post(`${settings.api}/application/save`, data)
            .then(response => (response.data as ActApplicationDto));
    }

    delete(data: ActApplicationDto) {
        return this.$http.post(`${settings.api}/application/delete`, { id: data.id })
            .then(response => (response.data as ActApplicationDto));
    }
}