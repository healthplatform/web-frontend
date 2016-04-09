import {Storage} from './storage.service';

export class StorageController {
  public formData = new FormData();
  public img: Blob;

  /* @ngInject */
  constructor(private Storage: Storage) {
  }
}
