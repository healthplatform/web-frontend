import {Historic, IPatientHistory} from './historic.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class HistoricController {
  public historic: IPatientHistory;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $stateParams: IStateParamsService,
              private Historic: Historic) {

  }

  get() {
    this.Historic.get(this.$stateParams.medicareNo).then((historic: IPatientHistory) => {
        this.historic = historic;
      }
    );
  }
}
