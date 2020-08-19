import DomListener from '@core/DomListener';

export default class ExcelComponent extends DomListener {
  constructor($root, options = []) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  /**
   * Returns component HTML template
   * @returns {string} HTML template
   */
  toHTML() {
    return '';
  }

  /**
   * Notifies listeners about event
   * @param event {string}
   * @param args {...*}
   */
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  /**
   * Subscribes to emitter event
   * @param event {string}
   * @param cb {callback}
   */
  $on(event, cb) {
    this.unsubscribers = this.emitter.subscribe(event, cb);
  }

  /**
   * Dispatches store action
   * @param action
   */
  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  /**
   * Performs actions before component initialization
   */
  prepare() {}

  /**
   * Initializes component and adding DOM listeners
   */
  init() {
    this.initDOMListeners();
  }

  /**
   * Destroys component and removes DOM and event listeners
   */
  destroy() {
    this.removeDOMListeners();
    if (this.unsubscribers.length) {
      this.unsubscribers.forEach(unsub => unsub());
    }
  }
}
