export interface IAuth {
  logout(): void;
  getEmail(): string;
}

export class Auth implements IAuth {
  /* @ngInject */
  constructor(private $state: angular.ui.IStateService) {
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  logout() {
    localStorage.clear();
    this.$state.go('auth');
  }
}
