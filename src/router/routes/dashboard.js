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
      path: 'tracking-item',
      name: 'Tracking Item',
      component: () => import('@/views/Dashboard/TrackingItem.vue'),
      meta: { auth: true },
    },
    {
      path: 'tracking-saya',
      name: 'Tracking Saya',
      component: () => import('@/views/Dashboard/TrackingSaya.vue'),
      meta: { auth: true },
    },
    {
      path: 'tracking-detail/:id',
      name: 'Tracking Detail',
      component: () => import('@/views/Dashboard/TrackingDetail.vue'),
      meta: { auth: true },
    },
    {
      path: 'monitoring-item',
      name: 'Monitoring item',
      component: () => import('@/views/Dashboard/MonitoringItem.vue'),
      meta: { auth: true },
    },
    {
      path: 'company',
      name: 'List Perusahaan',
      component: () => import('@/views/Dashboard/Company.vue'),
      meta: { auth: true },
    },
    {
      path: 'add-company',
      name: 'Tambah Perusahaan',
      component: () => import('@/views/Dashboard/AddCompany.vue'),
      meta: { auth: true },
    },
    {
      path: 'po',
      name: 'PO',
      component: () => import('@/views/Dashboard/PO.vue'),
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
