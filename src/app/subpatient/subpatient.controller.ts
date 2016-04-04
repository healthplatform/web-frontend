import {Patient, IFetchAllPatientRelated} from './../patient/patient.service';

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class SubPatientController {
  public allPatientRelated: IFetchAllPatientRelated;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              private Patient: Patient) {
    this.getAllById();
  }


  getAllById() {
    this.$log.info('SubPatientController::getAllById, this.$stateParams =', this.$stateParams);
    this.Patient.getAllById(this.$stateParams.medicareNo).then((allPatientRelated: IFetchAllPatientRelated) => {
        this.allPatientRelated = allPatientRelated;
      }
    );
  }
}
