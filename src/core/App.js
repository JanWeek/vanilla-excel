export default class App {
  constructor(rootSelector, modules) {
    const { router, store } = modules;
    this.rootSelector = rootSelector;
    this.router = router;
    this.store = store;
  }

  init() {
    this.router.setRoot(this.rootSelector);
    this.router.init();

    if (process.env.NODE_ENV === 'development') {
      window.$app = this;
    }
  }
}
