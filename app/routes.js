import App from './containers/App';
import Layout from './containers/Layout';

export default {
  component: Layout,
  childRoutes: [
    {
      path: '/',
      component: App
    }
  ]
};
