import {Patient, IFetchAllPatientRelated} from '../patient/patient.service';

export interface IPatientHistory {
  medicare_no: string;
  createdAt: Date;
  updatedAt: Date;
  hypertension?: boolean;
  asthma?: boolean;
  diabetes?: boolean;
  diabetesType?: string;
  diabeticSince?: Date;
  diabetesControl?: string;
  hbA1c?: number;
  allergies?: Array<string>;
  currentMedication?: Array<string>;
  eyedropIntolerance?: string;
  familySocialHistory?: string;
  ethnicity?: string;
}


export class Historic {
  public cache: ng.ICacheObject;
  public patientCache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              private Patient: Patient,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Historic');
    this.patientCache = this.Patient.cache;
  }

  get(path: string): ng.IPromise<{}> {
    const self = this,
      key = `[GET] /api/patient/${path}/historic`,
      allKey = `[GET] /api/patient/${path}/all`;

    if (!path) {
      return this.$q((resolve: any, reject: (s: string) => void) => {
        reject('path is undefined');
      });
    }

    if (this.patientCache.get(allKey)) {
      this.cache.put(key, (<IFetchAllPatientRelated>this.patientCache.get(allKey)).historic);
    }

    const cached_data: IPatientHistory = <IPatientHistory>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (arg: IPatientHistory) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.get(`/api/patient/${path}/historic`).then(
        function (response: ng.IHttpPromiseCallbackArg<IPatientHistory>) {
          self.cache.put(key, response.data);
          deferred.resolve(response.data);
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
