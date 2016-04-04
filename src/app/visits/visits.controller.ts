import {Visits, IVisit} from './visits.service';

export class VisitsController {
  public summary: IVisit[];
  public email: string;
  public searchText: string;
  public sortType: string = 'name';

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private Visits: Visits) {
    this.getVisits();
  }

  getVisits(/*offset?: number, limit?: number, filter?: string*/) {
    this.Visits.get().then((res: ng.IHttpPromiseCallbackArg<IVisit[]>) => {
        this.summary = <IVisit[]>res;
      }, (err: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) =>
        this.$log.error('err =', err)
    );
  }
}
