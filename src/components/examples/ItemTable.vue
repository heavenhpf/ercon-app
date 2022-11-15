<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" index="false" :data="g$label" :columns="dt.column"
                :actions="dt.action" @edit="triggerEdit" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$item from '@/stores/dashboard/item';

export default {
    // name: 'Monitoring',
    data: () => ({
        pageTitle: 'Item',
        // Input
        input: {
        },

        // DataTable
        dt: {
            column: [
                {
                    name: 'd_po_detail.d_po.po_number',
                    th: 'Nomor Barang',
                    render: ({ d_po_detail }) => d_po_detail.d_po.po_number,
                },
                {
                    name: 'd_po_detail..d_po.s_company_d_po_order_fromTos_company.name',
                    th: 'Perusahaan PO',
                    render: ({ d_po_detail }) => d_po_detail.d_po.s_company_d_po_order_fromTos_company.name,
                },
                {
                    name: 'd_po_detail.quantity',
                    th: 'Update Produksi',
                    render: ({ d_po_detail }) => d_po_detail.quantity,
                },
                {
                    name: 'd_po_detail.d_order.quantity',
                    th: 'Jumlah Pesanan',
                    render: ({ d_po_detail }) => d_po_detail.d_order.quantity,
                },
                {
                    name: 'd_item.unit',
                    th: 'Satuan',
                    render: ({ d_item }) => d_item.unit,
                },
                {
                    th: 'Label',
                    render: ({ }) => {
                        return `<span class="badge bg-primary">Purchasing Order</span>`
                    }
                },
            ],
            action: [
                {
                    text: 'Edit',
                    color: 'primary',
                    event: 'edit',
                },
            ],
        },
        // UI
        modal: {
            add: false,
            detail: false,
            confirm: false,
            edit: false,
        },
    }),
    computed: {
        ...mapState(d$item, ['g$label']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
    },
    methods: {
        async triggerEdit({ id_item, id_item_detail }) {
            try {
                this.modal.detail = false;
                this.$router.push({ name: 'Update Produksi', params: { id_item, id_item_detail } })
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>