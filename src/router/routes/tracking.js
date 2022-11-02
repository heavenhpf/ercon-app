const tracking = {
    path: '/tracking',
    name: 'Tracking',
    children: [
        {
            path: 'tracking-tier-bawah',
            name: 'Tracking Tier Bawah',
            component: () => import('@/views/Tracking/TrackingTierBawah.vue'),
            meta: { auth: true },
        },
        {
            path: 'tracking-saya',
            name: 'Tracking Saya',
            component: () => import('@/views/Tracking/TrackingSaya.vue'),
            meta: { auth: true },
        },
        {
            path: 'tracking-detail/:id',
            name: 'Tracking Detail',
            component: () => import('@/views/Tracking/TrackingDetail.vue'),
            meta: { auth: true },
        },
    ],
};

export default tracking;