const monitoring = {
    path: '/monitoring',
    name: 'Monitoring',
    children: [
        {
            path: 'gudang-saya',
            name: 'Gudang Saya',
            component: () => import('@/views/Monitoring/GudangSaya.vue'),
            meta: { auth: true },
        },
        // {
        //     path: 'detail-item/:id',
        //     name: 'Detail Item',
        //     component: () => import('@/views/Monitoring/DetailItem.vue'),
        //     meta: { auth: true },
        // },
        {
            path: 'detail-item/:id',
            name: 'Detail Item',
            component: () => import('@/views/Monitoring/DetailItem.vue'),
            meta: { auth: true },
        },
        {
            path: 'update-produksi/:id_po/:id_item/:id_item_detail',
            name: 'Update Produksi',
            component: () => import('@/views/Monitoring/UpdateProduksi.vue'),
            meta: { auth: true },
        },
        {
            path: 'monitoring-item',
            name: 'Monitoring Item',
            component: () => import('@/views/Monitoring/MonitoringItem.vue'),
            meta: { auth: true },
        },
        {
            path: 'tambah-item',
            name: 'Tambah Item',
            component: () => import('@/views/Monitoring/TambahItem.vue'),
            meta: { auth: true },
        },
    ],
};

export default monitoring;