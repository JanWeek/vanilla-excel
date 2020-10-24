export default class Emitter {
  private readonly listeners: any;

  constructor() {
    this.listeners = {};
  }

  emit(event: string, ...args: any[]): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener: (...params: any[]) => void) => {
      listener(...args);
    });
    return true;
  }

  subscribe(event: string, cb: () => void): () => void {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener: () => void) => listener !== cb);
    };
  }
}
