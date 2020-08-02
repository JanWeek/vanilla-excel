import createStore from '@core/createStore';
import initialState from '@/store/initialState';
import { debounce, storage } from '@core/utils';
import rootReducer from '@/store/rootReducer';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import './scss/index.scss';

console.log(initialState);

/*
  TODO: if user's local storage structure doesn't match with actual it will not work.
        Should destroy old local storage and init new one
 */
const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  console.log('App state: ', state);
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
