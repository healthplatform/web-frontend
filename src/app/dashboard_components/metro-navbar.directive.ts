export function metro_navbar(): angular.IDirective {
  return {
    restrict: 'E',
    templateUrl: 'app/dashboard_components/metro-navbar.html',
    controller: 'AuthController',
    controllerAs: 'auth'
  };
}
