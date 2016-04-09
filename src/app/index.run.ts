import Moment = moment.Moment;

export interface IRootScopeService extends ng.IRootScopeService {
  navigated: boolean;
  $state: ng.ui.IStateService;
  moment: Moment;
}


/** @ngInject */
export function runBlock($state: ng.ui.IStateService,
                         $rootScope: IRootScopeService,
                         $http: ng.IHttpService,
                         $log: ng.ILogService,
                         moment: Moment,
                         amMoment: {changeLocale(...locale: string[]): void}) {
  amMoment.changeLocale('en-AU');

  $rootScope.$state = $state;
  $rootScope.navigated = false;
  $rootScope.moment = moment;

  $rootScope.$on('$stateChangeStart',
    (event: ng.IAngularEvent, toState: ng.ui.IState, toParams: any, fromState: ng.ui.IState) => {
      if (fromState.name) {
        $rootScope.navigated = true;
      }
      if (toState.name === 'auth') {
        return;
      } else if (!localStorage.getItem('token')) {
        event.preventDefault();
        (<any>$).Notify({
          caption: 'Error',
          content: `Must be authenticated to view ${toState.name.substr(toState.name.indexOf('.') + 1)} state`,
          type: 'alert'
        });
        $state.go('auth');
      } else {
        $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('token');
      }
    }
  );
}
