/** @ngInject */
export function runBlock($log: angular.ILogService,
                         $state: angular.ui.IStateService) {
  if (!$state.is('auth') && !localStorage.getItem('email')) {
    $log.info('Going to auth');
    $state.go('auth');
  }
}
