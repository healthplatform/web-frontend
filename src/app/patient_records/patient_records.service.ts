import {Visits, IPatientRecordSummary} from '../visits/visits.service';

export class PatientRecords {
  public allVisits: IPatientRecordSummary[];
  public thisVisit: IPatientRecordSummary;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private Visits: Visits) {
  }

  populateAllVisits(next: () => void) {
    this.Visits.get().then((res: ng.IHttpPromiseCallbackArg<IPatientRecordSummary[]>) => {
        this.allVisits = <IPatientRecordSummary[]>res;
        return next();
      }, (err: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) => {
        this.$log.error('err =', err);
        return next();
      }
    );
  }

  getPatient(ident: {medicareNo?: string}, cb: (visit: IPatientRecordSummary) => void) {
    this.populateAllVisits(() => {
      this.thisVisit = this.allVisits.filter(
        (visit: IPatientRecordSummary) => visit.medicare_no === ident.medicareNo
      )[0];
      return cb(this.thisVisit);
    });
  }
}
