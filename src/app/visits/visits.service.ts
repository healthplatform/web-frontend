import {Patient, IFetchAllPatientRelated} from '../patient/patient.service';

export interface IVisit {
  medicare_no: string;
  createdAt: string;
  updatedAt: string;
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
  callback?: string;
  cct_right_eye?: number;
  gonio_left_eye?: number;
}


export class Visits {
  public cache: ng.ICacheObject;
  public patientCache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              private Patient: Patient,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Visits');
    this.patientCache = this.Patient.cache;
  }

  static sortVisits(visits: IVisit[]) {
    return visits.sort((v0: IVisit, v1: IVisit) =>
      moment(v1.createdAt, moment.ISO_8601).diff(moment(v0.createdAt, moment.ISO_8601)));
  }

  get(path: string): ng.IPromise<{}> {
    const self = this,
      key = `[GET] /api/patient/${path}/visits`,
      allKey = `[GET] /api/patient/${path}/all`;

    if (!path) {
      return this.$q((resolve: any, reject: (s: string) => void) => {
        reject('path is undefined');
      });
    }

    if (this.patientCache.get(allKey)) {
      this.cache.put(key, (<IFetchAllPatientRelated>this.patientCache.get(allKey)).visits);
    }

    const cached_data: IVisit = <IVisit>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IVisit) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${path}/visits`).then(
        function (response: ng.IHttpPromiseCallbackArg<{visits: IVisit[]}>) {
          response.data.visits = Visits.sortVisits(response.data.visits);
          self.cache.put(key, response.data.visits);
          deferred.resolve(response.data.visits);
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
