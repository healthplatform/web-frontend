/// <reference path='../../.tmp/typings/tsd.d.ts' />

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {GithubContributor} from './components/githubContributor/githubContributor.service';
import {WebDevTecService} from './components/webDevTec/webDevTec.service';
import {acmeNavbar} from './components/navbar/navbar.directive';
import {acmeMalarkey} from './components/malarkey/malarkey.directive';
import {Auth} from './auth/auth.service';
import {Visit} from './visit/visit.service';
import {Visits} from './visits/visits.service';
import {Patient} from './patient/patient.service';
import {Historic} from './historic/historic.service';
import {AuthController} from './auth/auth.controller';
import {VisitController} from './visit/visit.controller';
import {VisitsController} from './visits/visits.controller';
import {SubdashController} from './subdash/subdash.controller';
import {AdminController} from './admin/admin.controller';
import {CalendarController} from './calendar/calendar.controller';
import {ClinicController} from './clinic/clinic.controller';
import {InventoryController} from './inventory/inventory.controller';
import {NotificationsController} from './notifications/notifications.controller';
import {PatientController} from './patient/patient.controller';
import {LoadingController} from './loading/loading.controller';
import {SidebarController} from './dashboard_components/sidebar.controller';
import {HistoricController} from './historic/historic.controller';
import {ContactController} from './contact/contact.controller';
import {sidebar} from './dashboard_components/sidebar.directive';
import {metro_navbar} from './dashboard_components/metro-navbar.directive';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module healthPlatform {
  'use strict';

  angular.module('healthPlatform', [
      'ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource',
      'ui.router', 'toastr', 'ui.grid', 'ui.grid.selection', 'angularMoment'])
    // .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .service('Auth', Auth)
    .service('Visits', Visits)
    .service('Patient', Patient)
    .service('Historic', Historic)
    .service('Visit', Visit)
    .controller('AuthController', AuthController)
    .controller('VisitsController', VisitsController)
    .controller('SubdashController', SubdashController)
    .controller('AdminController', AdminController)
    .controller('CalendarController', CalendarController)
    .controller('ClinicController', ClinicController)
    .controller('InventoryController', InventoryController)
    .controller('HistoricController', HistoricController)
    .controller('NotificationsController', NotificationsController)
    .controller('PatientController', PatientController)
    .controller('LoadingController', LoadingController)
    .controller('SidebarController', SidebarController)
    .controller('ContactController', ContactController)
    .controller('VisitController', VisitController)
    .directive('sidebar', sidebar)
    .directive('metronavbar', metro_navbar)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey);
}
