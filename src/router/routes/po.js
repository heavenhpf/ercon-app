const po = {
    path: '/po',
    name: 'AjukanPO',
    children: [
      {
        path: 'ajukan-po-1',
        name: 'Ajukan PO 1',
        component: () => import('@/views/PO/AjukanPO1.vue'),
        meta: { auth: true },
      },
      {
        path: 'ajukan-po-2/:order_to',
        name: 'Ajukan PO 2',
        component: () => import('@/views/PO/AjukanPO2.vue'),
        meta: { auth: true },
      },
    ],
  };
  
  export default po;