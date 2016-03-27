export function sidebar(): angular.IDirective {
  return {
    restrict: 'E',
    controller: 'SidebarController',
    controllerAs: 'sidebar',
    templateUrl: 'app/dashboard_components/sidebar.html'
  };
}
