import {IVisit, Visits} from './visits.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class VisitsController {
  public visits: Array<IVisit>;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $stateParams: IStateParamsService,
              private Visits: Visits) {
    this.get();
  }

  get() {
    this.Visits.get(this.$stateParams.medicareNo).then((visits: Array<IVisit>) => {
        this.visits = visits;
      }
    );
  }
}
