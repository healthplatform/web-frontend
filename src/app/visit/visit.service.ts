import {IVisit} from '../visits/visits.service';
import {IFetchAllPatientRelated} from '../patient/patient.service';

export class Visit {
  public cache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Visit');
  }

  get(medicareNo: string, createdAt: string): ng.IPromise<{}> {
    const self = this,
      key = `[GET] /api/patient/${medicareNo}/visit/${createdAt}`,
      allKey = `[GET] /api/patient/${medicareNo}/all`;

    if (this.cache.get(allKey)) {
      this.cache.put(key, (<IFetchAllPatientRelated>this.cache.get(allKey)).visits.filter(
        (visit: IVisit) => visit.createdAt === createdAt
      ));
    }

    const cached_data: IVisit = <IVisit>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IVisit) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${medicareNo}/visit/${createdAt}`).then(
        function (response: ng.IHttpPromiseCallbackArg<IVisit>) {
          self.cache.put(key, <IVisit>response.data);
          deferred.resolve(<IVisit>response.data);
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
