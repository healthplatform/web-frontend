export function patients_dash(): angular.IDirective {
  return {
    restrict: 'E',
    templateUrl: 'app/patients/patients-dash.directive.html',
    controller: 'PatientsController',
    controllerAs: 'patients'
  };
}
