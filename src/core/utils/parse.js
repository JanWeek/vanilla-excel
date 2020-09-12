export default function parse(value = '') {
  // TODO: change eval() to normal parsing with regular expressions
  if (value.startsWith('=')) {
    try {
      // eslint-disable-next-line no-eval
      return eval(value.slice(1));
    } catch (e) {
      console.warn(e.message);
      return value;
    }
  }
  return value;
}
