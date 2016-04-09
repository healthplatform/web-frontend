import {Visit} from './visit.service';
import {IVisit} from '../visits/visits.service';
import {IRootScopeService} from '../index.run';
import {Storage, IFile} from '../storage/storage.service';


interface IStateParamsService extends angular.ui.IStateParamsService {
  medicareNo: string;
  createdAt: string;
}

export class VisitController {
  public visit: IVisit;
  public newVisit: IVisit;
  public urlToProgress: {[url: string]: number};

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: IStateParamsService,
              public $rootScope: IRootScopeService,
              private Visit: Visit,
              private $state: angular.ui.IStateService,
              public Storage: Storage) {
    if ($stateParams.createdAt) {
      this.get();
    }
  }

  get() {
    this.Visit.get(this.$stateParams.medicareNo, this.$stateParams.createdAt).then((visit: IVisit) => {
        this.visit = visit;
      }
    );
  }

  create() {
    this.newVisit.medicare_no = this.$stateParams.medicareNo;
    this.Visit.post(this.newVisit).then((visit: IVisit) => {
        this.visit = visit;
        (<any>$).Notify({
          caption: 'Created visit',
          content: `At: ${visit.createdAt}`,
          type: 'success'
        });
        this.$state.go('subsubpatient.visit', {medicareNo: visit.medicare_no, createdAt: visit.createdAt});
      }
    );
  }

  upload(file: IFile, location: string) {
    this.Storage.upload(file).then((url: string) => {
        this.urlToProgress === undefined ?
          this.urlToProgress = {[url]: 0} : this.urlToProgress[url] = 0;
        this.newVisit === undefined ?
          this.newVisit = <any>{[location]: file.name} : this.newVisit[location] = file.name;
      }
    );
  }
}
