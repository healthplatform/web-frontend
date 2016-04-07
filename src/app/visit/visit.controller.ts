import {Visit} from './visit.service';
import {IVisit} from '../visits/visits.service';
import {IRootScopeService} from '../index.run';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
  createdAt: string;
}

export class VisitController {
  public visit: IVisit;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              public $rootScope: IRootScopeService,
              private Visit: Visit) {
    this.get();
  }

  get() {
    this.Visit.get(this.$stateParams.medicareNo, this.$stateParams.createdAt).then((visit: IVisit) => {
        this.visit = visit;
      }
    );
  }
}
