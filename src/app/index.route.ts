/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('auth', {
      url: '/',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard'
    })
    .state('visits', {
      url: '/visits/:medicareNo',
      templateUrl: 'app/visits/visits.html',
      controller: 'VisitsController',
      controllerAs: 'visits'
    })
  ;

  $urlRouterProvider.otherwise('/');
}
