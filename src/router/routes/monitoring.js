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