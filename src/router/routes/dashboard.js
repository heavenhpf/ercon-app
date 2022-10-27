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
      path: 'tracking-tier-bawah',
      name: 'Tracking Tier Bawah',
      component: () => import('@/views/Dashboard/TrackingTierBawah.vue'),
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
      name: 'TrackingDetail',
      component: () => import('@/views/Dashboard/TrackingDetail.vue'),
      meta: { auth: true },
    },
    {
      path: 'monitoring-item',
      name: 'Monitoring Item',
      component: () => import('@/views/Dashboard/MonitoringItem.vue'),
      meta: { auth: true },
    },
    {
      path: 'gudang-saya',
      name: 'Gudang Saya',
      component: () => import('@/views/Dashboard/GudangSaya.vue'),
      meta: { auth: true },
    },
    {
      path: 'tambah-item',
      name: 'Tambah Item',
      component: () => import('@/views/Dashboard/TambahItem.vue'),
      meta: { auth: true },
    },
    {
      path: 'ajukan-po',
      name: 'Ajukan PO',
      component: () => import('@/views/Dashboard/AjukanPO.vue'),
      meta: { auth: true },
    },
    {
      path: 'company',
      name: 'List Perusahaan',
      component: () => import('@/views/Dashboard/Company.vue'),
      meta: { auth: true },
    },
    {
      path: 'tambah-company',
      name: 'Tambah Perusahaan',
      component: () => import('@/views/Dashboard/TambahCompany.vue'),
      meta: { auth: true },
    },
    {
      path: 'company-saya',
      name: 'Perusahaan Saya',
      component: () => import('@/views/Dashboard/CompanySaya.vue'),
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