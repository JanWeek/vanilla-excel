import Page from '@core/router/Page';
import $ from '@core/Dom';
import { createRecordsTable } from '@/pages/dashboard.functions';

export default class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(this.render());
  }

  render() {
    const now = Date.now().toString().toString();
    return `
      <div class="db">
      <div class="db__header">
        <h1>Excel Панель управления</h1>
      </div>
      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>
      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    </div>
  `;
  }
}
