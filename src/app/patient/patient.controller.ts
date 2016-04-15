import {IPatient, Patient, IFetchAllPatientRelated} from './patient.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class PatientController {
  public allPatientRelated: IFetchAllPatientRelated;
  public patient: IPatient;
  private newPatient: IPatient;

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

  create() {
    if (!this.newPatient || !this.newPatient.contact) {
      (<any>$).Notify({
        caption: 'Invalid patient',
        content: 'Fill it in, and set contact',
        type: 'alert'
      });
      return;
    }
    this.newPatient.contact.description = 'patient';
    this.Patient.post(this.newPatient).then((patient: IPatient) => {
      this.patient = patient;
      (<any>$).Notify({
        caption: 'Created patient',
        content: `With id: ${patient.medicare_no} at: ${patient.createdAt}`,
        type: 'success'
      });

      this.$state.go('subdash.loading', {medicareNo: patient.medicare_no});
    });
  }
}
