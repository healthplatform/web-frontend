import IRequestShortcutConfig = angular.IRequestShortcutConfig;

export interface IContact {
  first_name?: string;
  last_name?: string;
  street?: string;
  suburb?: string;
  state?: string;
  country?: string;
  contact0?: string;
  contact1?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatient {
  medicare_no: string;
  sex?: string;
  dob?: string;
  contact?: IContact;
  gp?: IContact;
  other_specialists?: IContact[];
  createdAt: Date;
  updatedAt: Date;
}

export class Patient {
  public cache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Patient');
  }

  getAll(config: IRequestShortcutConfig = {params: {populate_contact: true}}): ng.IPromise<{}> {
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

  get(path: string,
      config: IRequestShortcutConfig = {params: {populate_contact: true}}): ng.IPromise<{}> {
    const self = this,
      key = `[GET] /api/patient/${path}`,
      cached_data: IPatient = <IPatient>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IPatient) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${path}`, config).then(
        function (response: ng.IHttpPromiseCallbackArg<IPatient>) {
          self.cache.put(key, <IPatient>response.data);
          deferred.resolve(<IPatient>response.data);
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
