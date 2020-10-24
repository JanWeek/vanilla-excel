import StateProcessor from '@/store/StateProcessor';
import LocalStorageClient from '@core/LocalStorageClient';
import Page from '@core/router/Page';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import normalizeState from '@/store/normalizeState';
import rootReducer from '@/store/rootReducer';
import createStore from '@/store/createStore';

export default class ExcelPage extends Page {
  constructor(params) {
    super(params);

    this.storeSubscribe = null;
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params)
    );
  }

  async getRoot() {
    const state = await this.processor.get();
    const initialState = normalizeState(state);
    const store = createStore(rootReducer, initialState);

    this.storeSubscribe = store.subscribe(this.processor.listen);

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
    this.storeSubscribe.unsubscribe();
  }
}
