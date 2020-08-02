import $ from '@core/Dom';
import ExcelComponent from '@core/ExcelComponent';
import actions from '@/store/actions';
import { defaultTableTitle } from '@core/const';
import { debounce } from '@core/utils';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput);
  }

  toHTML() {
    const title = this.store.getState().tableTitle || defaultTableTitle;
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTableTitle($target.text()));
  }
}
