export interface IPatientRecordSummary {
  medicare_no: string;
  name: string;
  suburb: string;
  callback: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Visits {
  public cache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Visits');
  }

  get(): ng.IPromise<{}> {
    const self = this,
      key = '[GET] /api/visits',
      cached_data: IPatientRecordSummary[] = <IPatientRecordSummary[]>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IPatientRecordSummary[]) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get('/api/visits').then(
        function (response: ng.IHttpPromiseCallbackArg<{visits: IPatientRecordSummary[]}>) {
          self.cache.put(key, <IPatientRecordSummary[]>response.data.visits);
          deferred.resolve(<IPatientRecordSummary[]>response.data.visits);
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
