import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import {IVisit, Visits} from '../visits/visits.service';
import {IPatientHistory} from '../historic/historic.service';
import {Patients} from '../patients/patients.service';

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
  public patientsCache: ng.ICacheObject;
  public processing: {[name: string]: boolean};

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              private Patients: Patients,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Patient');
    this.patientsCache = this.Patients.cache;
  }

  get(medicareNo: string,
      config: IRequestShortcutConfig = {params: {populate_contact: true}}): ng.IPromise<{}> {
    const self = this,
      key = `[GET] /api/patient/${medicareNo}`,
      allKey = `[GET] /api/patient/${medicareNo}/all`,
      patientsKey = `[GET] /api/patients`;

    if (this.cache.get(allKey)) {
      this.cache.put(key, (<IFetchAllPatientRelated>this.cache.get(allKey)).patient);
    } else if (this.patientsCache.get(patientsKey)) {
      this.cache.put(key, (<IPatient[]>this.patientsCache.get(patientsKey)).filter((patient: IPatient) =>
        patient.medicare_no === medicareNo
      ));
    }

    const cached_data: IPatient = <IPatient>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IPatient) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${medicareNo}`, config).then(
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

  getAllById(medicareNo: string,
             config: IRequestShortcutConfig = {params: {populate_contact: true}}): ng.IPromise<{}> {
    const self = this,
      key: string = `[GET] /api/patient/${medicareNo}/all`,
      cached_data: IFetchAllPatientRelated = <IFetchAllPatientRelated>this.cache.get(key);

    if (!medicareNo) {
      return this.$q((resolve: any, reject: (s: string) => void) => {
        reject('medicareNo is undefined');
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
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${medicareNo}/all`, config).then(
        function (response: ng.IHttpPromiseCallbackArg<IFetchAllPatientRelated>) {
          self.processing[key] = false;
          self.cache.put(key, response.data);
          self.cache.put(`GET /api/patient/${medicareNo}`, response.data.patient);
          self.cache.put(`GET /api/patient/${medicareNo}/historic`, response.data.historic);
          self.cache.put(`GET /api/patient/${medicareNo}/visits`, Visits.sortVisits(response.data.visits));
          deferred.resolve(<IFetchAllPatientRelated>response.data);
        },
        function (errors: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) {
          self.processing[key] = false;
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
