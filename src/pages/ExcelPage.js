import Page from '@core/router/Page';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import normalizeState from '@/store/initialState';
import rootReducer from '@/store/rootReducer';
import createStore from '@/store/createStore';
import { debounce, storage } from '@core/utils/functions';

function storageName(param) {
  return `excel:${param}`;
}

export default class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    /*
    TODO: if user's local storage structure doesn't match with actual it will not work.
          Should destroy old local storage and init new one
    */
    const initialState = storage(storageName(params));
    const store = createStore(rootReducer, normalizeState(initialState));

    const stateListener = debounce(state => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
