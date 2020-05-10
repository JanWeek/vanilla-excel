import './scss/index.scss';

console.log('It works!');

async function start() {
  return await Promise.resolve('Async working');
}

start().then(console.log);
