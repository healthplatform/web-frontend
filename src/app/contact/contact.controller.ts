import {IContact, IPatient, Patient} from './../patient/patient.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class ContactController {
  public contact: IContact;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $stateParams: IStateParamsService,
              private Patient: Patient) {
    this.get();
  }

  get() {
    this.Patient.get(this.$stateParams.medicareNo).then((patient: IPatient) => {
        this.contact = patient.contact;
      }
    );
  }
}
