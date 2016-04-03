import { PatientController } from './patient.controller.ts';
import { WebDevTecService } from '../components/webDevTec/webDevTec.service';

describe('controllers', () => {
  let PatientController: PatientController;

  beforeEach(angular.mock.module('healthPlatform'));

  beforeEach(inject(($controller: angular.IControllerService, webDevTec: WebDevTecService, toastr: any) => {
    webDevTec.data = [null, null, null, null, null];
    spyOn(toastr, 'info').and.callThrough();

    PatientController = $controller('PatientController');
  }));
});
