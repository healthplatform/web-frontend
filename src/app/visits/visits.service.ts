export interface IVisit {
  createdAt: Date;
  updatedAt: Date;
  acuity_left_eye_num?: number;
  acuity_left_eye_den?: number;
  acuity_right_eye_num?: number;
  acuity_right_eye_den?: number;
  refraction_right_eye?: number;
  vf_right_eye?: string;
  iop_right_eye?: number;
  iop_left_eye?: number;
  reason?: string;
  gonio_right_eye?: number;
  retinal_disc_left_eye?: string;
  /*additional_left_eye?: string[];
   additional_right_eye?: string[];*/
  vf_left_eye?: string;
  refraction_left_eye?: number;
  retinal_disc_right_eye?: string;
  cct_left_eye?: number;
  callback?: Date;
  cct_right_eye?: number;
  gonio_left_eye?: number;
  medicare_no: string;
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
      cached_data: IVisit[] = <IVisit[]>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IVisit[]) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get('/api/visits').then(
        function (response: ng.IHttpPromiseCallbackArg<{visits: IVisit[]}>) {
          self.cache.put(key, <IVisit[]>response.data.visits);
          deferred.resolve(<IVisit[]>response.data.visits);
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
