import { certCookies } from '@/utils/cookies';

const auth = {
  path: '/',
  name: 'Auth',
  beforeEnter: (to, from, next) => {
    const { id } = certCookies();
    if (!to.matched.some(({ path }) => path.includes('auth')) && !id) next({ name: 'Dashboard' });
    else if (to.path === '/' && id !== undefined) next({ name: 'Default' });
    else next();
  },
  children: [
    {
      path: '/auth/login',
      name: 'LogIn',
      component: () => import('@/views/Auth/Login.vue'),
    },
    {
      path: '/auth/signup',
      name: 'SignUp',
      component: () => import('@/views/Auth/Signup.vue'),
    },
    {
      path: ':pathMatch(.*)',
      alias: ':pathMatch(.*)',
      name: '404',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
};

export default auth;
