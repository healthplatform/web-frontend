export class DashboardController {
  private logger: ng.ILogService;

  /* @ngInject */
  constructor($log: ng.ILogService) {
    this.logger = $log;
  }
}
