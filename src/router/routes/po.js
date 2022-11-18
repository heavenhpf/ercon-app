const po = {
    path: '/po',
    name: 'AjukanPO',
    children: [
      {
        path: 'ajukan-po',
        name: 'Ajukan PO',
        component: () => import('@/views/PO/AjukanPO.vue'),
        meta: { auth: true },
      },
      {
        path: 'pilih-order',
        name: 'Pilih Order',
        component: () => import('@/views/PO/PilihOrder.vue'),
        meta: { auth: true },
      },
    ],
  };
  
  export default po;