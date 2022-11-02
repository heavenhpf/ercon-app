const akun = {
    path: '/akun',
    name: 'Manajemen Akun',
    children: [
      {
        path: 'company',
        name: 'List Perusahaan',
        component: () => import('@/views/Akun/Company.vue'),
        meta: { auth: true },
      },
      {
        path: 'tambah-company',
        name: 'Tambah Perusahaan',
        component: () => import('@/views/Akun/TambahCompany.vue'),
        meta: { auth: true },
      },
      {
        path: 'company-saya',
        name: 'Perusahaan Saya',
        component: () => import('@/views/Akun/CompanySaya.vue'),
        meta: { auth: true },
      },
    ],
  };
  
  export default akun;