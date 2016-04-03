import {IPatient, Patient} from './patient.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class PatientController {
  public patients: IPatient[];
  public patient: IPatient;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              private Patient: Patient) {
  }

  getAll() {
    this.Patient.getAll().then((patients: IPatient[]) =>
      this.patients = patients
    );
  }

  get() {
    this.Patient.get(this.$stateParams.medicareNo).then((patient: IPatient) => {
        this.$log.info('patient =', patient);
        this.patient = patient;
      }
    );
  }
}
