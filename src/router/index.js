import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import About from '../pages/About.vue';
import NotFound from '../pages/NotFound.vue';
import BaseLayout from '../pages/BaseLayout.vue';
// import AddPaymentForm from '../components/AddPaymentForm.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboardPage', params: { page: 1 } },
    },
    {
      path: '/dashboard',
      redirect: { name: 'dashboardPage', params: { page: 1 } },
    },
    {
      path: '/add/payment/:category?',
      redirect: (to) => {
        const { params: { category }, query } = to;
        return { name: 'addPayment', params: { page: 1, category }, query };
      },
    },
    {
      path: '/dashboard',
      component: BaseLayout,
      children: [
        {
          path: ':page',
          name: 'dashboardPage',
          component: Dashboard,
          children: [
            {
              path: 'add/payment/:category',
              name: 'addPayment',
            },
          ],
        },
      ],
    },
    {
      path: '/about',
      component: BaseLayout,
      children: [
        {
          path: '',
          name: 'about',
          component: About,
        },
      ],
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
    },
    {
      path: '*',
      redirect: { name: 'notFound' },
    },
  ],
});

const titles = {
  dashboard: 'Dashboard',
  dashboardPage: 'Dashboard',
  addPayment: 'Dashboard',
  about: 'About',
  notFound: '404 - Not Found!',
};

router.afterEach((to) => {
  document.title = titles[to.name];
});

export default router;
