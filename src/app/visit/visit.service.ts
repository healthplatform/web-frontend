import {IVisit, Visits} from '../visits/visits.service';
import {IFetchAllPatientRelated, Patient} from '../patient/patient.service';


export class Visit implements ng.IServiceProvider {
  public cache: ng.ICacheObject;
  public patientCache: ng.ICacheObject;
  public visitsCache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              private $rootScope: ng.IRootScopeService,
              Patient: Patient,
              Visits: Visits,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Visit');
    this.visitsCache = Visits.cache;
    this.patientCache = Patient.cache;
  }

  public $get(): Visit {
    return this;
  }

  get(medicareNo: string, createdAt: string): ng.IPromise<{}> {
    const self = this,
      key = `[GET] /api/patient/${medicareNo}/visit/${createdAt}`,
      allKey = `[GET] /api/patient/${medicareNo}/all`;

    if (this.patientCache.get(allKey)) {
      const visit = (<IFetchAllPatientRelated>this.patientCache.get(allKey)).visits.filter(
        (visit: IVisit) => visit.createdAt === createdAt
      );
      if (visit.length) {
        this.cache.put(key, visit[0]);
      }
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

  post(visit: IVisit): ng.IPromise<{}> {
    const deferred = this.$q.defer(),
      self = this;
    this.$http.post(`/api/patient/${visit.medicare_no}/visit`, visit).then(
      function (response: ng.IHttpPromiseCallbackArg<IVisit>) {
        self.$rootScope.$broadcast('visit::new', response.data);
        self.$log.info('visit:new sent');
        self.visitsCache.put(`GET /api/patient/${visit.medicare_no}/visit`, response.data);
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
