class HttpInterceptor {
  constructor() {
    ['request', 'requestError', 'response', 'responseError']
      .forEach((method: any) => {
        if (this[method]) {
          this[method] = this[method].bind(this);
        }
      });
  }
}

class ApiCallInterceptor extends HttpInterceptor implements ng.IHttpInterceptor {
  // @ngInject
  static factory($q: ng.IQService): ApiCallInterceptor {
    return new ApiCallInterceptor($q);
  }

  constructor(private $q: ng.IQService) {
    super();
  }

  request(config: ng.IRequestConfig): ng.IRequestConfig {
    config.headers['X-Access-Token'] = localStorage.getItem('token');
    localStorage.setItem('settTokenTo', localStorage.getItem('token'));

    return config;
  };

  response<T>(response: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<T> {

    // modify response

    return this.$q.when(response);
  };
}

/** @ngInject */
export function config($logProvider: angular.ILogProvider,
                       toastrConfig: any,
                       $httpProvider: ng.IHttpProvider) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  $httpProvider.interceptors.push(ApiCallInterceptor.factory);
}
