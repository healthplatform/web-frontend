import {IVisit, Visits} from './visits.service';
import MomentStatic = moment.MomentStatic;

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class VisitsController {
  public visits: Array<IVisit>;
  public createdDates: Array<MomentStatic>;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $stateParams: IStateParamsService,
              private Visits: Visits,
              public moment: MomentStatic) {
    this.get();
  }

  get() {
    this.Visits.get(this.$stateParams.medicareNo).then((visits: Array<IVisit>) => {
        this.visits = visits.reverse();
        this.createdDates = visits.map((visit: IVisit) =>
          <any>moment(visit.createdAt, moment.ISO_8601)
        );
      }
    );
  }

  getDate(idx: number) {
    return this.createdDates[idx];
  }
}
