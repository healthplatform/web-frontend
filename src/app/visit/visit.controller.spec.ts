import { VisitController } from './visit.controller.ts';
import { WebDevTecService } from '../components/webDevTec/webDevTec.service.ts';

describe('controllers', () => {
  let VisitController: VisitController;

  beforeEach(angular.mock.module('healthPlatform'));

  beforeEach(inject(($controller: angular.IControllerService, webDevTec: WebDevTecService, toastr: any) => {
    webDevTec.data = [null, null, null, null, null];
    spyOn(toastr, 'info').and.callThrough();

    VisitController = $controller('VisitController');
  }));
});
