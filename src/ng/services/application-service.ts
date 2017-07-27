import { ActApplicationDto, RawApplicationDto } from '../../common/models/act-application';
import settings from '../settings';

export default class ApplicationService {
    static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {

    }

    list() {
        return this.$http.get('/api/application/list')
            .then(response => (response.data as ActApplicationDto[]));
    }

    save(data: RawApplicationDto) {
        return this.$http.post('/api/application/save', data)
            .then(response => (response.data as ActApplicationDto));
    }

    delete(data: ActApplicationDto) {
        return this.$http.post('/api/application/delete', { id: data.id })
            .then(response => (response.data as ActApplicationDto));
    }
}