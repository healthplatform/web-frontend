import {Visits, IPatientRecordSummary} from './visits.service';

export class VisitsController {
  public summary: IPatientRecordSummary[];
  public email: string;
  public searchText: string;
  public sortType: string = 'name';

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private Visits: Visits) {
    this.getVisits();
  }

  getVisits(/*offset?: number, limit?: number, filter?: string*/) {
    this.Visits.get().then((res: ng.IHttpPromiseCallbackArg<IPatientRecordSummary[]>) => {
        this.summary = <IPatientRecordSummary[]>res;
      }, (err: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) =>
        this.$log.error('err =', err)
    );
  }
}
