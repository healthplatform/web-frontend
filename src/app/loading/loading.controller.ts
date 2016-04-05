import {Patient, IFetchAllPatientRelated} from './../patient/patient.service';
import IStateService = angular.ui.IStateService;

interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
}

export class LoadingController {
  public allPatientRelated: IFetchAllPatientRelated;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              public $state: IStateService,
              private Patient: Patient) {
    if ($state.$current.toString() === 'subdash.loading') {
      this.getAllById();
    }
  }


  getAllById() {
    this.Patient.getAllById(this.$stateParams.medicareNo).then((allPatientRelated: IFetchAllPatientRelated) => {
        this.allPatientRelated = allPatientRelated;
        this.$state.go('subpatient.patient', this.$stateParams);
      }
    );
  }
}
