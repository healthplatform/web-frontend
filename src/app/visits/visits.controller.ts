import {Auth} from '../auth/auth.service';

export class VisitsController {
  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: angular.ui.IStateParamsService,
              private Auth: Auth) {
    Auth.redirUnlessAuth();
  }
}
