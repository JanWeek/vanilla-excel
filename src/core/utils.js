export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index);
}

export function storage(key, data = null) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function isEqual(value1, value2) {
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    return JSON.stringify(value1) === JSON.stringify(value2);
  }
  return value1 === value2;
}

export function toKebabCase(string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map(key => `${toKebabCase(key)}: ${styles[key]}`)
    .join(';');
}

export function debounce(fn, time) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, time);
  };
}
