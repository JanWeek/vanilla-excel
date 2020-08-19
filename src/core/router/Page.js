export default class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('getRoot method should be implemented');
  }

  afterRender() {}

  destroy() {}
}
