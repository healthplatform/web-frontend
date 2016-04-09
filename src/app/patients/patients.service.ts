import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import {IPatient} from '../patient/patient.service';

export class Patients {
  public cache: ng.ICacheObject;
  public searchText: string;
  public sortType: string;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Patients');
  }

  get(config: IRequestShortcutConfig = {params: {populate_contact: true}}): ng.IPromise<{}> {
    const self = this,
      key = '[GET] /api/patients',
      cached_data: IPatient[] = <IPatient[]>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IPatient[]) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get('/api/patients', config).then(
        function (response: ng.IHttpPromiseCallbackArg<{patients: IPatient[]}>) {
          self.cache.put(key, <IPatient[]>response.data.patients);
          deferred.resolve(<IPatient[]>response.data.patients);
        },
        function (errors: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) {
          self.$log.debug(errors);
          if (errors.data) {
            (<any>$).Notify({
              caption: 'Error',
              content: errors.data.message || errors.data.error_message || errors.data,
              type: 'alert'
            });
          }
          deferred.reject(errors);
        }
      );
      return deferred.promise;
    }
  }
}
