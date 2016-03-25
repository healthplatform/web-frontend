import {Auth} from '../auth/auth.service';

export interface IPatientRecordSummary {
  medicare_no: string;
  name: string;
  suburb: string;
  callback: string;
  last_visit: string;
}

export class DashboardController {
  public patientRecordSummary: IPatientRecordSummary[] = [
    {
      medicare_no: '532534543534', name: 'Alec Burg',
      suburb: 'Alice Springs', callback: '3m', last_visit: '33 days ago'
    },
    {
      medicare_no: '752534543587', name: 'Charlotte Truss',
      suburb: 'Redfern', callback: '3m', last_visit: '33 days ago'
    },
    {
      medicare_no: '442534543544', name: 'Gus Wyndburg',
      suburb: 'Merrylands', callback: '3m', last_visit: '32 days ago'
    },
    {
      medicare_no: '862534543536', name: 'Harry Faulk',
      suburb: 'Southbank', callback: '2y', last_visit: '5 days ago'
    },
    {
      medicare_no: '332534543563', name: 'Gale Vine',
      suburb: 'Newfoundland', callback: '6m', last_visit: 'yesterday'
    },
  ];

  /*public gridOptions: uiGrid.IGridOptions = {
   enableRowSelection: true,
   enableRowHeaderSelection: false,
   data: DashboardController.patientRecordSummary
   };*/

  public email: string;
  public searchText: string;
  public sortType: string = 'name';

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private Auth: Auth) {
    Auth.redirUnlessAuth();
    // todo:  move to route-level DSL
  }

  search() {
    this.$log.info('this.searchText =', this.searchText);
  }
}
