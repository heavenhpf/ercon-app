import { createRouter, createWebHistory } from 'vue-router';

import { certCookies } from '@/utils/cookies';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const { id } = certCookies();
  if (to.matched.some(({ meta }) => meta.auth) && !id) {
    next({ name: 'LogIn' });
  } else if (to.matched.some(({ path }) => path.includes('auth')) && id) {
    next({ name: 'Default' });
  } else {
    next();
  }
});

export default router;