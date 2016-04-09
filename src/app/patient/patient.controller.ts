import {IPatient, Patient, IFetchAllPatientRelated} from './patient.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class PatientController {
  public patient: IPatient;
  public allPatientRelated: IFetchAllPatientRelated;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              public $state: ng.ui.IStateService,
              private Patient: Patient) {
    this.getAllById();
  }

  get() {
    this.Patient.get(this.$stateParams.medicareNo).then((patient: IPatient) => {
        this.patient = patient;
      }
    );
  }

  getAllById() {
    this.Patient.getAllById(this.$stateParams.medicareNo).then((allPatientRelated: IFetchAllPatientRelated) => {
        this.allPatientRelated = allPatientRelated;
        this.patient = allPatientRelated.patient;
      }
    );
  }
}
