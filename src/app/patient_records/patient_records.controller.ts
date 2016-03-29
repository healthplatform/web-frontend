import {PatientRecords} from './patient_records.service';
import {IPatientRecordSummary} from '../visits/visits.service';

export class PatientRecordsController {
  public thisVisit: IPatientRecordSummary;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: angular.ui.IStateParamsService,
              PatientRecords: PatientRecords) {
    PatientRecords.getPatient($stateParams, (thisVisit: IPatientRecordSummary) =>
      this.thisVisit = thisVisit
    );
  }
}
