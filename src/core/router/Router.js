import $ from '@core/DOM';
import ActiveRoute from '@core/router/ActiveRoute';

export default class Router {
  constructor(selector, routes, loader) {
    this.routes = routes;
    this.loader = loader;
    this.$root = null;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);
  }

  setRoot(selector) {
    this.$root = $(selector);
  }

  async init() {
    window.addEventListener('hashchange', this.changePageHandler);
    await this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$root.clear().append(this.loader);

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();

    this.$root.clear().append(root);

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
