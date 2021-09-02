import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { routers } from '@/utils/rules';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/index',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

routers.forEach((i) => router.addRoute(i));

export default router;
