export interface IAuth {
  // $log: ng.ILogService;
  // $state: angular.ui.IStateService;
  // ($log: ng.ILogService, $state: angular.ui.IStateService): Auth;
  redirUnlessAuth(role?: string): void;
  logout(): void;
}

export class Auth implements IAuth {
  /* @ngInject */
  constructor(private $state: angular.ui.IStateService) {
  }

  redirUnlessAuth(role?: string) {
    if (this.$state.$current.toString().length && !localStorage.getItem('email') && !this.$state.is('auth')) {
      (<any>$).Notify({
        caption: 'Error',
        content: 'Must be authenticated to view /dashboard',
        type: 'alert'
      });
      this.$state.go('auth');
    }
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  logout() {
    localStorage.clear();
    this.$state.go('auth');
  }
}
