import {IVisit, Visits} from './visits.service';
import {IFetchAllPatientRelated} from '../patient/patient.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

interface IScope extends ng.IScope {
  visitsNo: number;
}

export class VisitsController {
  public visits: Array<IVisit>;
  public createdDates: Array<moment.Moment>;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $stateParams: IStateParamsService,
              private Visits: Visits,
              private $rootScope: ng.IRootScopeService,
              public moment: moment.Moment) {
    this.get(() => {
      this.$rootScope.$on('visit::new', (event: ng.IAngularEvent, newVisit: IVisit) => {
        this.$log.info('visit:new received');
        const key = `[GET] /api/patient/${this.$stateParams.medicareNo}`,
          allKey = `[GET] /api/patient/${this.$stateParams.medicareNo}/all`;

        let allPatient: IFetchAllPatientRelated = <IFetchAllPatientRelated>this.Visits.patientCache.get(allKey);
        if (allKey) {
          allPatient.visits.push(newVisit);
        }
        let visits = <Array<IVisit>>this.Visits.cache.get(key);
        if (visits) {
          visits.push(newVisit);
        }

        this.get();
      });
    });
  }

  get(cb?: () => void) {
    this.Visits.get(this.$stateParams.medicareNo).then((visits: Array<IVisit>) => {
        this.createdDates = visits.map((visit: IVisit) =>
          moment(visit.createdAt, moment.ISO_8601)
        );
        this.visits = visits;
        if (cb) {
          return cb();
        }
      }
    );
  }

  getDate(idx: number) {
    return this.createdDates[idx];
  }
}
