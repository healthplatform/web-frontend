export class DashboardController {
  public email: string;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $state: angular.ui.IStateService) {

    // TODO: Fix this to work globally
    if (!localStorage.getItem('email')) $state.go('auth');

    this.email = localStorage.getItem('email');
  }

  // TODO: Move this out into an auth module or similar
  logout() {
    localStorage.clear();
    this.$state.go('auth');
  }
}
