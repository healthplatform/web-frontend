import { PatientsController } from './patients.controller.ts';
import { WebDevTecService } from '../components/webDevTec/webDevTec.service';

describe('controllers', () => {
  let PatientsController: PatientsController;

  beforeEach(angular.mock.module('healthPlatform'));

  beforeEach(inject(($controller: angular.IControllerService, webDevTec: WebDevTecService, toastr: any) => {
    webDevTec.data = [null, null, null, null, null];
    spyOn(toastr, 'info').and.callThrough();

    PatientsController = $controller('PatientsController');
  }));
});
