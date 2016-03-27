import {Auth} from './auth.service';

interface ICredentials {
  email: string;
  password: string;
}

export class AuthController {
  public credentials: ICredentials;
  private sampleUsers: ICredentials[] = [
    {
      email: 'foo@bar.com',
      password: 'verysecure'
    }
  ];

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private Auth: Auth,
              private $state: angular.ui.IStateService) {
  }

  protected static isEmail(val: string): boolean {
    // same routine as the widget, i.e.; from 'metro/js/widgets/validator.js'
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(val);
  }

  submit() {
    if (this.sampleUsers.filter((user: ICredentials) =>
        user.email === this.credentials.email &&
        user.password === this.credentials.password
      ).length) {
      const base_email = this.credentials.email.slice(0, this.credentials.email.indexOf('@'));
      (<any>$).Notify({
        caption: 'Authenticated...',
        content: `Welcome back ${base_email}`,
        type: 'success'
      });

      localStorage.setItem('email', this.credentials.email);
      localStorage.setItem('base_email', base_email);

      this.$state.go('subdash.visits');
    } else {
      const error_description: string =
        this.credentials.email && AuthController.isEmail(this.credentials.email)
          ? 'Authentication error' : 'Invalid email';
      (<any>$).Notify({
        caption: 'Error',
        content: error_description,
        type: 'alert'
      });
    }
  }

  demo() {
    this.credentials = <ICredentials>{
        email: 'foo@bar.com',
        password: 'verysecure'
      } || this.sampleUsers[0];
    this.submit();
  }
}
