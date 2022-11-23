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
        {
            path: 'pesanan-masuk',
            name: 'Pesanan Masuk',
            component: () => import('@/views/Tracking/PesananMasuk.vue'),
            meta: { auth: true },
        },
        {
            path: 'update-produksi/:id_po/:id_item/:id_item_detail',
            name: 'Update Produksi',
            component: () => import('@/views/Monitoring/UpdateProduksi.vue'),
            meta: { auth: true },
        },
        {
            path: 'pesanan-masuk-detail/:id',
            name: 'Pesanan Masuk Detail',
            component: () => import('@/views/Tracking/PesananMasukDetail.vue'),
            meta: { auth: true },
        },
        {
            path: 'edit-info-po/:id_po/:id_po_detail',
            name: 'Edit Informasi PO',
            component: () => import('@/views/Tracking/EditInformasiPO.vue'),
            meta: { auth: true },
        },
    ],
};

export default tracking;