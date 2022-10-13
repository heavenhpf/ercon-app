const dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  children: [
    {
      path: '',
      name: 'Default',
      component: () => import('@/views/Dashboard/Default.vue'),
      meta: { auth: true },
    },
    {
      path: 'tracking',
      name: 'Tracking',
      component: () => import('@/views/Dashboard/Tracking.vue'),
      meta: { auth: true },
    },
    {
      path: 'tracking-detail/:id',
      name: 'TrackingDetail',
      component: () => import('@/views/Dashboard/TrackingDetail.vue'),
      meta: { auth: true },
    },
    {
      path: 'company',
      name: 'Company List',
      component: () => import('@/views/Dashboard/Company.vue'),
      meta: { auth: true },
    },
    {
      path: 'po',
      name: 'PO',
      component: () => import('@/views/Dashboard/PO.vue'),
      meta: { auth: true },
    },
    {
      path: 'add-company',
      name: 'Add Company',
      component: () => import('@/views/Dashboard/AddCompany.vue'),
      meta: { auth: true },
    },
    {
      path: 'tables',
      name: 'Tables',
      component: () => import('@/views/Dashboard/Tables.vue'),
      meta: { auth: true },
    },
    {
      path: 'billing',
      name: 'Billing',
      component: () => import('@/views/Dashboard/Billing.vue'),
      meta: { auth: true },
    },
    {
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/Dashboard/Profile.vue'),
      meta: { auth: true },
    },
  ],
};

export default dashboard;