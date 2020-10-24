import './scss/index.scss';
// import createStore from '@/store/createStore';
import Router from '@core/router/Router';
import App from '@core/App';
import DashboardPage from '@/pages/DashboardPage';
import ExcelPage from '@/pages/ExcelPage';
import Loader from '@/components/loader/Loader';

const router = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
}, new Loader());

// const store = createStore();

const app = new App('#app', {
  router
});

app.init();
