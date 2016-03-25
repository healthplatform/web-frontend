export function metro_navbar(): angular.IDirective {
  return {
    restrict: 'E',
    templateUrl: 'app/dashboard/metro-navbar.html',
    controller: 'AuthController',
    controllerAs: 'auth'
  };
}
