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
    ],
  };
  
  export default po;