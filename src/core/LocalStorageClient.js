import { storage, storageName } from '@core/utils/functions';

export default class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => {
        resolve(state);
      }, 3000);
    });
  }
}
