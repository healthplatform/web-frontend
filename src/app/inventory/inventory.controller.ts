export class InventoryController {
  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $stateParams: angular.ui.IStateParamsService,
              private $state: angular.ui.IStateService) {

    let p = $state.$current.toString();
    (<any>$).Notify({
      caption: 'Info',
      content: `${p.substr(p.indexOf('.') + 1)} state not available in demo`,
      type: 'info'
    });
    $state.go('subdash.patients');
  }
}
