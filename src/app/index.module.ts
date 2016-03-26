/// <reference path='../../.tmp/typings/tsd.d.ts' />

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {GithubContributor} from '../app/components/githubContributor/githubContributor.service';
import {WebDevTecService} from '../app/components/webDevTec/webDevTec.service';
import {acmeNavbar} from '../app/components/navbar/navbar.directive';
import {acmeMalarkey} from '../app/components/malarkey/malarkey.directive';
import {AuthController} from './auth/auth.controller';
import {Auth} from './auth/auth.service';
import {DashboardController} from './dashboard/dashboard.controller';
import {VisitsController} from './visits/visits.controller';
import {sidebar} from './dashboard/sidebar.directive';
import {metro_navbar} from './dashboard/metro-navbar.directive';
import {SubdashController} from './subdash/subdash.controller';
import {AdminController} from './admin/admin.controller';
import {CalendarController} from './calendar/calendar.controller';
import {ClinicController} from './clinic/clinic.controller';
import {InventoryController} from './inventory/inventory.controller';
import {NotificationsController} from './notifications/notifications.controller';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module healthPlatform {
  'use strict';

  angular.module('healthPlatform', [
      'ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages',
      'ngAria', 'ngResource', 'ui.router', 'toastr', 'ui.grid', 'ui.grid.selection'])
    // .constant('malarkey', malarkey)
    // .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .service('Auth', Auth)
    .controller('AuthController', AuthController)
    .controller('DashboardController', DashboardController)
    .controller('VisitsController', VisitsController)
    .controller('SubdashController', SubdashController)
    .controller('AdminController', AdminController)
    .controller('CalendarController', CalendarController)
    .controller('ClinicController', ClinicController)
    .controller('InventoryController', InventoryController)
    .controller('NotificationsController', NotificationsController)
    .directive('sidebar', sidebar)
    .directive('metronavbar', metro_navbar)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey);
}
