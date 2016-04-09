import {IVisit, Visits} from './visits.service';
import Moment = moment.Moment;

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class VisitsController {
  public visits: Array<IVisit>;
  public createdDates: Array<Moment>;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $stateParams: IStateParamsService,
              private Visits: Visits,
              public moment: Moment) {
    this.get();
  }

  get() {
    this.Visits.get(this.$stateParams.medicareNo).then((visits: Array<IVisit>) => {
        this.createdDates = visits.map((visit: IVisit) =>
          moment(visit.createdAt, moment.ISO_8601)
        );
        this.visits = visits;
      }
    );
  }

  getDate(idx: number) {
    return this.createdDates[idx];
  }
}
