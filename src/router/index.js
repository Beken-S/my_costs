import Vue from 'vue';
import Router from 'vue-router';

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
      component: () => import(
        /* webpackChunkName: "BaseLayout" */ '../pages/BaseLayout.vue'
      ),
      children: [
        {
          path: ':page',
          name: 'dashboardPage',
          component: () => import(/* webpackChunkName: "Dashboard" */ '../pages/Dashboard.vue'),
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
      component: () => import(
        /* webpackChunkName: "BaseLayout" */ '../pages/BaseLayout.vue'
      ),
      children: [
        {
          path: '',
          name: 'about',
          component: () => import(/* webpackChunkName: "About" */ '../pages/About.vue'),
        },
      ],
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound.vue'),
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
