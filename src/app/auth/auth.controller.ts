import {Auth} from './auth.service';

interface ICredentials {
  email: string;
  password: string;
}

export class AuthController {
  public credentials: ICredentials;
  private logger: ng.ILogService;
  private stateSrv: angular.ui.IStateService;
  private sampleUsers: ICredentials[] = [
    {
      email: 'foo@bar.com',
      password: 'verysecure'
    }
  ];

  /* @ngInject */
  constructor($log: ng.ILogService,
              $state: angular.ui.IStateService,
              public Auth: Auth) {
    this.logger = $log;
    this.stateSrv = $state;
  }

  protected static isEmail(val: string): boolean {
    // same routine as the widget, i.e.; from 'metro/js/widgets/validator.js'
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(val);
  }

  submit(credentials: ICredentials) {
    this.credentials = credentials;

    if (this.sampleUsers.filter((user: ICredentials) =>
        user.email === credentials.email &&
        user.password === credentials.password
      ).length) {
      const base_email = credentials.email.slice(0, credentials.email.indexOf('@'));
      (<any>$).Notify({
        caption: 'Authenticated...',
        content: `Welcome back ${base_email}`,
        type: 'success'
      });

      localStorage.setItem('email', credentials.email);
      localStorage.setItem('base_email', base_email);

      this.stateSrv.go('dashboard');
    } else {
      const error_description: string =
        credentials.email && AuthController.isEmail(credentials.email)
          ? 'Authentication error' : 'Invalid email';
      (<any>$).Notify({
        caption: 'Error',
        content: error_description,
        type: 'alert'
      });
    }
  }
}
