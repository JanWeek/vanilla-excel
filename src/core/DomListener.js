import capitalize from '@core/utils';

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

export default class DomListener {
  constructor(root, listeners = []) {
    if (!root) {
      throw new Error('No root provided for DOM Listener');
    }
    this.$root = root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} component`);
      }
      this[method] = this[method].bind(this);
      // addEventListener alias
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      // removeEventListener alias
      this.$root.off(listener, this[method]);
    });
  }
}
