import {Auth} from '../auth/auth.service';

export class DashboardController {
  public email: string;
  public logout: () => void;

  /* @ngInject */
  constructor(private Auth: Auth) {
    Auth.redirUnlessAuth();
    // todo:  move to route-level DSL

    this.email = localStorage.getItem('email');
  }
}
