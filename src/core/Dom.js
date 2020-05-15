class DOM {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(childNode) {
    /* if (childNode instanceof DOM) {
      childNode = childNode.$el;
    } */
    if (Element.prototype.append) {
      this.$el.append(childNode.$el);
    } else {
      this.$el.appendChild(childNode.$el);
    }
  }

  closest(selector) {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.assign(this.$el.style, styles);
  }
}

export default function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
