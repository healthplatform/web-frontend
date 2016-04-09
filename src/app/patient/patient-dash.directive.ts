export function patient_dash(): angular.IDirective {
  return {
    restrict: 'E',
    templateUrl: 'app/patient/patient-dash.directive.html',
    controller: 'PatientController',
    controllerAs: 'patient'
  };
}
