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
    .state('subdash', {
      templateUrl: 'app/subdash/subdash.html',
      controller: 'SubdashController',
      controllerAs: 'subdash'
    })
    .state('subdash.visits', {
      url: '/visits/:medicareNo',
      templateUrl: 'app/visits/visits.html',
      controller: 'VisitsController',
      controllerAs: 'visits'
    })
    .state('subdash.admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin'
    })
    .state('subdash.calendar', {
      url: '/calendar',
      templateUrl: 'app/calendar/calendar.html',
      controller: 'CalendarController',
      controllerAs: 'cal'
    })
    .state('subdash.clinic', {
      url: '/clinic',
      templateUrl: 'app/clinic/clinic.html',
      controller: 'ClinicController',
      controllerAs: 'clinic'
    })
    .state('subdash.inventory', {
      url: '/inventory',
      templateUrl: 'app/inventory/inventory.html',
      controller: 'InventoryController',
      controllerAs: 'inventory'
    })
    .state('subdash.notifications', {
      url: '/notifications',
      templateUrl: 'app/notifications/notifications.html',
      controller: 'NotificationsController',
      controllerAs: 'notifications'
    })
  ;

  $urlRouterProvider.otherwise('/');
}
