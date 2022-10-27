<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$list_po_detail" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <modal-comp size="lg" v-model:show="modal.detail">
            <template #header>
                <div class="modal-title">
                    <h5>Serial Number</h5>
                    <div>
                        <h6 class="mt-2">{{ g$get_po_detail.d_order?.d_item.serial_number }}</h6>
                    </div>
                </div>
                <!-- <div class="mt-2" style="text-align:right; color:danger"><b>{{ g$get_po_detail.d_po?.deadline }}</b>
                </div> -->
                <div class="col-5">
                    <p class="font-weight-bolder text-danger float-end">Deadline {{ new
                            Date(g$get_po_detail.d_po?.deadline).toLocaleDateString("id-ID", {
                                weekday: 'long', year:
                                    'numeric', month:
                                    'long', day: 'numeric'
                            })
                    }}</p>
                </div>
            </template>

            <!-- buat ngerubah detail -->
            <template size="lg" v-if="modal.detail" #body>
                <div class="row">
                    <h3 class="col-12">{{ g$get_po_detail.d_order?.d_item.name }}
                    </h3>
                    <p>{{ g$get_po_detail.d_order.d_item.desc }}</p>
                </div>
                <div>
                    <h5>Informasi Item</h5>
                </div>
                <div>
                    <p>{{ g$get_po_detail.note }} </p>
                </div>
                <div class="mt-2">
                    <h5>Nomor PO</h5>
                </div>
            </template>
            <template #footer>
                <div class="d-flex justify-content-start">
                    <div style="margin-left: 10px;">
                        <argon-button color="primary" @click="modal.detail = false">
                            Cari PO
                        </argon-button>
                    </div>
                    <argon-button color="danger" @click="editInquiry()">
                        Kembali
                    </argon-button>
                </div>
            </template>
        </modal-comp>
        <modal-comp v-model:show="modal.confirm">
            <template #header>
                <h3 class="modal-title">Confirm</h3>
            </template>
            <template v-if="modal.confirm" #body>
                <p>
                    Are you sure you want to delete <strong>{{ pageTitle }}: {{ input.name }}</strong>?
                </p>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.confirm = false">
                    Close
                </argon-button>
                <argon-button color="danger" @click="delInquiry()">Delete</argon-button>
            </template>
        </modal-comp>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$po from '@/stores/dashboard/po';
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
        filter_po_detail: {
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
                    name: 'id_order',
                    th: 'ID Order',
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
        ...mapState(d$po, ['g$list_po_detail', 'g$get_po_detail']),
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
                this.modal.detail = true;
            } catch (e) {
                console.error(e);
            }
        },
    }
};
</script>