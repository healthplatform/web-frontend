export interface IAuth {
  logout(): void;
  getEmail(): string;
  login(auth: IUser): ng.IPromise<{}>;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IAuthResp {
  access_token: string;
}

export class Auth implements IAuth {
  public cache: ng.ICacheObject;

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $state: angular.ui.IStateService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              $cacheFactory: ng.ICacheFactoryService) {
    this.cache = $cacheFactory('Auth');
  }

  login(user: IUser): ng.IPromise<{}> {
    const self = this,
      key = `[POST] /api/auth`,
      cached_data: string = <string>this.cache.get(key);

    if (cached_data) {
      return this.$q((resolve: (token: string) => void) =>
        resolve(cached_data)
      );
    } else {
      const deferred = this.$q.defer();
      this.$http.post(`/api/auth`, user).then(
        function (response: ng.IHttpPromiseCallbackArg<IAuthResp>) {
          self.cache.put(key, (<IAuthResp>response.data).access_token);
          deferred.resolve((<IAuthResp>response.data).access_token);
        },
        function (errors: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) {
          self.$log.debug(errors);
          if (errors.data) {
            (<any>$).Notify({
              caption: 'Error',
              content: errors.data.message || errors.data.error_message || errors.data,
              type: 'alert'
            });
          }
          deferred.reject(errors);
        }
      );
      return deferred.promise;
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
