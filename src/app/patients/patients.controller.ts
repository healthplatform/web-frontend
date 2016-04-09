import {IPatient} from '../patient/patient.service';
import {Patients} from './patients.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class PatientsController {
  public patients: Array<IPatient>;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              public Patients: Patients) {
    this.get();
  }

  get() {
    this.Patients.get(this.$stateParams.medicareNo).then((patients: Array<IPatient>) => {
        this.patients = patients;
      }
    );
  }
}
