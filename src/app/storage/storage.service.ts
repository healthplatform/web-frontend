import IFileUploadConfigFile = angular.angularFileUpload.IFileUploadConfigFile;

interface IFileItem {
  cancel: () => any;
  remove: () => any;
  upload: (config: IFileUploadConfigFile) => any;
}

export interface IFile {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
}

interface IProgressEvent extends ProgressEvent {
  status: string;
  config: { data: { file: IFile; }; };
  data: any;
}

export class Storage {
  /* @ngInject */
  constructor(private $log: ng.ILogService,
              public $q: ng.IQService,
              public $http: ng.IHttpService,
              private Upload: IFileItem) {
  }

  get(filename: string, uploader: string = localStorage.getItem('email')): string {
    return `/api/storage/${uploader}/${filename}?access_token=${localStorage.getItem('token')}`;
  }

  getOld(uploader: string, filename: string): ng.IPromise<{}> {
    const deferred = this.$q.defer();
    this.$http.get(`/api/storage/file/${filename}?uploader=${uploader}`).then(
      function (response: ng.IHttpPromiseCallbackArg<ImageData>) {
        deferred.resolve(response.data);
      },
      function (errors: ng.IHttpPromiseCallbackArg<{message?: string, error_message?: string}>) {
        this.$log.debug(errors);
        if (errors.data) {
          (<any>$).Notify({
            caption: 'Error',
            content: errors.data.message || errors.data.error_message || errors.data,
            type: 'alert'
          });
        }
        deferred.reject(errors);
      }
    );
    return deferred.promise;
  }

  /*
   progress(file: File) {
   return this.urlToProgress ?
   this.urlToProgress[`/api/storage/${encodeURIComponent(localStorage.getItem('email'))}/${file.name}`] : 0;
   }
   */

  upload(file: IFile): ng.IPromise<{}> {
    const user: string = encodeURIComponent(localStorage.getItem('email')),
      url: string = `/api/storage/${user}`,
      finalUrl: string = `${url}/${file.name}`,
      deferred = this.$q.defer();

    // this.urlToProgress ? this.urlToProgress[finalUrl] = 0 : this.urlToProgress = {[finalUrl]: 0};

    this.Upload.upload(<IFileUploadConfigFile>{
      url: url,
      data: {file: file, 'username': user}
    }).then(function (resp: IProgressEvent) {
      console.log('resp.config.data =', resp.config.data);
      if (resp.config.data.file) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        deferred.resolve(finalUrl);
      } else {
        deferred.reject('resp.config.data.file undefined');
      }
    }, function (resp: IProgressEvent) {
      console.log('Error status: ' + resp.status);
      console.log('Error resp: ', resp);
      (<any>$).Notify({
        caption: 'Error',
        content: resp.data.error_message,
        type: 'alert'
      });
      deferred.reject(resp.status);
    }, function (evt: IProgressEvent) {
      console.log(`${(evt.loaded / evt.total) * 100}% to ${finalUrl}`);
      // this.urlToProgress[finalUrl] = evt.loaded / evt.total;
    });
    return deferred.promise;
  };
}
