import normalizeState from '@/store/normalizeState';

export default class Store {
  constructor(stateProcessor, rootReducer) {
    this.listeners = [];
    this.state = {};
    this.rootReducer = rootReducer;
    this.processor = stateProcessor;
  }

  async init() {
    const state = await this.processor.get();
    const normalizedState = normalizeState(state);
    this.state = this.rootReducer({ ...normalizedState }, { type: '__INIT__' });
  }

  subscribe(fn) {
    this.listeners.push(fn);

    return {
      unsubscribe() {
        this.listeners.filter(listener => listener !== fn);
      }
    };
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}
