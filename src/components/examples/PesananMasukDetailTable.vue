<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$list_po_detail" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" />
        </div>
    </div>
</template>

<script>
import d$po from '@/stores/dashboard/po';
import { mapActions, mapState } from "pinia";
import auth from '../../router/routes/auth';

// const progress = {
//     0: "Belum Deadline",
//     1: "Melewati Deadline",
//     2: "Progress Selesai"
// }

export default {
    name: 'POTable',
    data: () => ({
        pageTitle: 'POTable',
        // Input
        input: {
            id: null,
            name: '',
        },
        filter: {
            id_po: null,
            id_po_detail: null
       },
        // DataTable
        dt: {
            column: [
                {
                    name: 'd_order.d_item.serial_number',
                    th: 'Serial Number',
                    render: ({ d_order }) => d_order.d_item.serial_number
                },
                {
                    name: 'd_order.d_item.name',
                    th: 'nama item',
                    render: ({ d_order }) => d_order.d_item.name
                },
                {
                    name: 'd_order.quantity',
                    th: 'Jumlah Pesanan',
                    render: ({ d_order }) => d_order.quantity
                },
                {
                    name: 'progress',
                    th: 'progress',
                    render: ({ progress }) => {
                        return `<progress  value="${progress}" max="1">${progress}%</progress>`
                    }
                },
            ],
            action: [
                {
                    text: 'Detail',
                    color: 'warning',
                    event: 'detail',
                }
            ],
        },

        // UI
        modal: {
            add: false,
            detail: false,
            confirm: false,
        },
    }),
    computed: {
        ...mapState(d$po, ['g$list_po_detail', 'g$get_po_detail', 'g$po']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listPoDetail({ id_po: this.$route.params.id });
    },
    methods: {
        ...mapActions(d$po, ['a$listPoDetail', 'a$getPoDetail']),

        async triggerDetail({ id_po_detail, id_po }) {
            try {
                this.filter_po_detail = {
                    id_po: Number(id_po),
                    id_po_detail: Number(id_po_detail)
                }
                await this.a$getPoDetail(this.filter_po_detail);
                this.$router.push({ name: 'Edit Order', params: { id: id_po } })
                this.modal.detail = true;
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>