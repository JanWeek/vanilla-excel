import $ from '@core/Dom';
import ExcelComponent from '@core/ExcelComponent';
import actions from '@/store/actions';
import { defaultTableTitle } from '@core/utils/const';
import { debounce } from '@core/utils/functions';
import ActiveRoute from '@core/router/ActiveRoute';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onClick(event) {
    const $target = $(event.target);
    switch ($target.data.button) {
      case 'remove':
        const decision = confirm('Вы действительно хотите удалить таблицу?');
        if (decision) {
          localStorage.removeItem(`excel:${ActiveRoute.param}`);
          ActiveRoute.change('');
        }
        break;
      case 'exit':
        ActiveRoute.change('');
        break;
      default:
        event.preventDefault();
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTableTitle($target.text()));
  }
}
