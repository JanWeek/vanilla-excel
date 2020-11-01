import IStyles from '@/interfaces/IStyles';
import ITableCoords from '@/interfaces/ITableCoords';

class DOM {
  private $el: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector) as HTMLElement
      : selector;
  }

  html(content: HTMLElement | string): HTMLElement | string | this {
    if (typeof content === 'string') {
      this.$el.innerHTML = content;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  setText(content: string | number): this {
    this.$el.textContent = content as string;
    return this;
  }

  getText(): string {
    if (this.$el.tagName.toLowerCase() === 'input') {
      return (this.$el as HTMLInputElement).value.trim();
    }
    return (this.$el.textContent as string).trim();
  }

  clear(): this {
    this.html('');
    return this;
  }

  on(eventType: string, callback: EventListenerOrEventListenerObject): void {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType: string, callback: EventListenerOrEventListenerObject): void {
    this.$el.removeEventListener(eventType, callback);
  }

  append(childNode: DOM | HTMLElement): this {
    if (childNode instanceof DOM) {
      childNode = childNode.$el;
    }

    if (HTMLElement.prototype.hasOwnProperty('append')) {
      this.$el.append(childNode);
    } else {
      this.$el.appendChild(childNode);
    }

    return this;
  }

  closest(selector: string): DOM {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.closest(selector) as HTMLElement);
  }

  getCoords(): ClientRect {
    return this.$el.getBoundingClientRect();
  }

  data(): DOMStringMap {
    return (this.$el as HTMLElement).dataset;
  }

  find(selector: string) {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.querySelector(selector) as HTMLElement);
  }

  findAll(selector: string): NodeList {
    return this.$el.querySelectorAll(selector);
  }

  css(styles: IStyles<keyof CSSStyleDeclaration> = {}): void {
    Object.assign((this.$el as HTMLElement).style, styles);
  }

  getStyles(styles: string[]) {
    // TODO: remove any
    return styles.reduce((result: any, style: string) => {
      result[style] = (this.$el.style as any)[style];
      return result;
    }, {});
  }

  id(parse?: boolean): string | ITableCoords {
    if (parse) {
      const parsed = (this.id() as string).split(':');
      return {
        row: +parsed[0],
        col: +parsed[1]
      };
    }
    return this.data().id as string;
  }

  focus(): this {
    this.$el.focus();
    return this;
  }

  attr(name: string, value: string): string | this {
    if (typeof value !== 'undefined') {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name) as string;
  }

  addClass(className: string): this {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className: string): this {
    this.$el.classList.remove(className);
    return this;
  }
}

export default function $(selector: HTMLElement): DOM {
  return new DOM(selector);
}

$.create = (tagName: string, classes?: string): DOM => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
