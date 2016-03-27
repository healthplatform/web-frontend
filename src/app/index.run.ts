/** @ngInject */
export function runBlock($state: ng.ui.IStateService,
                         $rootScope: ng.IRootScopeService) {
  $rootScope.$on('$stateChangeStart',
    function (event: ng.IAngularEvent, toState: ng.ui.IState) {
      if (toState.name !== 'auth' && !localStorage.getItem('email')) {
        event.preventDefault();
        (<any>$).Notify({
          caption: 'Error',
          content: `Must be authenticated to view ${toState.name.substr(toState.name.indexOf('.') + 1)} state`,
          type: 'alert'
        });
        $state.go('auth');
      }
    }
  );
}
