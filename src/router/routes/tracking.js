const tracking = {
    path: '/tracking',
    name: 'Tracking',
    children: [
        {
            path: 'tracking-saya',
            name: 'Tracking Saya',
            component: () => import('@/views/Tracking/TrackingSaya.vue'),
            meta: { auth: true },
        },
        {
            path: 'tracking-tier-bawah',
            name: 'Tracking Tier Bawah',
            component: () => import('@/views/Tracking/TrackingTierBawah.vue'),
            meta: { auth: true },
        },
        {
            path: 'tracking-detail/:id',
            name: 'Tracking Detail',
            component: () => import('@/views/Tracking/TrackingDetail.vue'),
            meta: { auth: true },
        },
        // {
        //     path: 'tracking-detail/:id',
        //     name: 'Tracking Detail',
        //     component: () => import('@/views/Tracking/TrackingDetail.vue'),
        //     meta: { auth: true, role: [0, 1, 2] },
        // },
        {
            path: 'pesanan-masuk',
            name: 'Pesanan Masuk',
            component: () => import('@/views/Tracking/PesananMasuk.vue'),
            meta: { auth: true },
        },
        {
            path: 'pesanan-masuk-detail/:id',
            name: 'Pesanan Masuk Detail',
            component: () => import('@/views/Tracking/PesananMasukDetail.vue'),
            meta: { auth: true },
        },
    ],
};

export default tracking;