import './scss/index.scss';
import Router from '@core/router/Router';
import App from '@core/App';
import DashboardPage from '@/pages/DashboardPage';
import ExcelPage from '@/pages/ExcelPage';
import Loader from '@/components/loader/Loader';

const router = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
}, new Loader());

const app = new App('#app', {
  router
});

app.init();
