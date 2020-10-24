import $ from '@core/DOM';

export default function Loader() {
  return $.create('div', 'loader').html(`
    <div class="loader__lds-dual-ring"></div>
  `);
}
