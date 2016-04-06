import {Auth, IUser} from './auth.service';

export class AuthController {
  public credentials: IUser;
  public token: string; // access-token
  private sampleUsers: IUser[] = [
    {
      email: 'foo@bar.com',
      password: 'foo '
    }
  ];

  /* @ngInject */
  constructor(private Auth: Auth,
              private $state: angular.ui.IStateService) {
  }

  protected static isEmail(val: string): boolean {
    // same routine as the widget, i.e.; from 'metro/js/widgets/validator.js'
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(val);
  }

  submit() {
    if (this.credentials.email && !AuthController.isEmail(this.credentials.email)) {
      (<any>$).Notify({
        caption: 'Error',
        content: 'Invalid email',
        type: 'alert'
      });
    }
    this.Auth.login(this.credentials).then((token: string) => {
        this.token = token;
        const base_email = this.credentials.email.slice(0, this.credentials.email.indexOf('@'));
        localStorage.setItem('email', this.credentials.email);
        localStorage.setItem('base_email', base_email);
        localStorage.setItem('token', token);

        (<any>$).Notify({
          caption: 'Authenticated...',
          content: `Welcome back ${base_email}`,
          type: 'success'
        });
        this.$state.go('subdash.patients');
      }
    );
  }

  demo() {
    this.credentials = this.sampleUsers[0];
    this.submit();
  }
}
