import IState = angular.ui.IState;

interface IObjectCtor extends ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}
declare var Object: IObjectCtor;
export let assign = Object.assign ? Object.assign : function (target: any, ...sources: any[]): any {
  return;
};

/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider,
                             $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  const subpatientViews: { [name: string]: IState } = {
    contact: {
      templateUrl: 'app/contact/contact.html',
      controller: 'ContactController',
      controllerAs: 'contact'
    },
    historic: {
      templateUrl: 'app/historic/historic.html',
      controller: 'HistoricController',
      controllerAs: 'historic'
    },
    visits: {
      templateUrl: 'app/visits/visits.html',
      controller: 'VisitsController',
      controllerAs: 'visits'
    }
  };

  $stateProvider
    .state('auth', {
      url: '/',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('subdash', {
      templateUrl: 'app/subdash/subdash.html',
      controller: 'SubdashController',
      controllerAs: 'subdash',
      abstract: true
    })
    .state('subdash.storage', {
      url: '/storage',
      templateUrl: 'app/storage/storage.html',
      controller: 'StorageController',
      controllerAs: 'storage'
    })
    .state('subpatient', {
      templateUrl: 'app/subpatient/subpatient.html',
      abstract: true
    })
    .state('subdash.patients', {
      url: '/patients',
      templateUrl: 'app/patients/patients.html',
      controller: 'PatientsController',
      controllerAs: 'patients'
    })
    .state('subdash.loading', {
      templateUrl: 'app/loading/loading.html',
      controller: 'LoadingController',
      controllerAs: 'loading',
      url: '/patient/:medicareNo/load'
    })
    .state('subpatient.patient', {
      url: '/patient/:medicareNo',
      templateUrl: 'app/patient/patient.html',
      views: subpatientViews
    })
    .state('subsubpatient', {
      templateUrl: 'app/subsubpatient/subsubpatient.html',
      abstract: true
    })
    .state('subsubpatient.visit', {
      url: '/patient/:medicareNo/visit/:createdAt',
      views: Object.assign(subpatientViews, {
        visit: {
          templateUrl: 'app/visit/visit.html',
          controller: 'VisitController',
          controllerAs: 'visit'
        }
      })
    })
    .state('subsubpatient.createVisit', {
      url: '/patient/:medicareNo/visit',
      views: Object.assign(subpatientViews, {
        visit: {
          templateUrl: 'app/visit/create-visit.html',
          controller: 'VisitController',
          controllerAs: 'visit'
        }
      })
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
    .state('subdash.visits', {
      url: '/visits',
      controller: 'CalendarController'
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
