import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import {IVisit} from '../visits/visits.service';
import {IPatientHistory} from '../historic/historic.service';

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

export interface IFetchAllPatientRelated {
  patient: IPatient;
  historic: IPatientHistory;
  visits: Array<IVisit>;
}

export class Patient {
  public cache: ng.ICacheObject;
  public processing: {[name: string]: boolean};

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              private $rootScope: ng.IRootScopeService,
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

  getAllById(path: string,
             config: IRequestShortcutConfig = {params: {populate_contact: true}}): ng.IPromise<{}> {
    const self = this,
      key: string = `[GET] /api/patient/${path}/all`,
      cached_data: IFetchAllPatientRelated = <IFetchAllPatientRelated>this.cache.get(key);

    this.$log.info('getAllById =', path);
    if (!path) {
      return this.$q((resolve: any, reject: (s: string) => void) => {
        reject('path is undefined');
      });
    }

    if (cached_data) {
      if (this.processing) {
        delete this.processing[key];
      }
      return this.$q((resolve: (arg: IFetchAllPatientRelated) => void) =>
        resolve(cached_data)
      );
    } else {
      this.processing ? this.processing[key] = true : this.processing = {[key]: true};
      this.$log.info('Set this.processing');
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${path}/all`, config).then(
        function (response: ng.IHttpPromiseCallbackArg<IFetchAllPatientRelated>) {
          self.cache.put(key, response.data);
          self.cache.put(`GET /api/patient/${path}`, response.data.patient);
          self.cache.put(`GET /api/patient/${path}/historic`, response.data.historic);
          self.cache.put(`GET /api/patient/${path}/visits`, response.data.visits);
          deferred.resolve(<IFetchAllPatientRelated>response.data);
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
