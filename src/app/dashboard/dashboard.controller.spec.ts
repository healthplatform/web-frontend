import { DashboardController } from './dashboard.controller';
import { WebDevTecService } from '../components/webDevTec/webDevTec.service';

describe('controllers', () => {
  let DashboardController: DashboardController;

  beforeEach(angular.mock.module('healthPlatform'));

  beforeEach(inject(($controller: angular.IControllerService, webDevTec: WebDevTecService, toastr: any) => {
    webDevTec.data = [null, null, null, null, null];
    spyOn(toastr, 'info').and.callThrough();

    DashboardController = $controller('DashboardController');
  }));
});