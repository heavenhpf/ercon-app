<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" index="false" :data="g$list_po_detail" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @edit="triggerEdit" />
        </div>
        <modal-comp size="lg" v-model:show="modal.detail">
            <template #header>
                <h2 class="modal-title">Add New {{ pageTitle }}</h2>
            </template>
            <template v-if="modal.add" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input pe="text" placeholder="Name" name="name" size="md">
                        </argon-input>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="primary" @click="addInquiry()">
                    Save Changes
                </argon-button>
                <argon-button color="secondary" @click="modal.add = false">
                    Close
                </argon-button>
            </template>
        </modal-comp>
        <modal-comp size="lg" v-model:show="modal.detail">
            <template #header>
                <div class="col-6 modal-title">
                    <h5>Serial Number</h5>
                    <div>
                        <h6 class="mt-2">{{ g$get_po_detail.d_order?.d_item.serial_number }}</h6>
                    </div>
                </div>
                <div class="mt-3">
                    <p class="font-weight-bolder text-danger float-end">Deadline: {{ new
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
                    <div class="row">
                        <div class="col-auto">
                            <div class="rounded" style="background-color: rgba(59, 130, 246, 0.4);">
                                <h6 class="p-2 ps-4 pe-4 text-dark font-weight-bolder text-center" id="NomorPO">{{
                                g$get_po_detail.note_po
                                }}</h6>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div id="showToast"
                                class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body" style="text-align:center">
                                        Nomor PO disimpan pada clipboard
                                    </div>
                                </div>
                            </div>
                            <argon-button id="showToast" data-bs-toggle="modal"
                                style="background-color: rgba(217, 217, 217);" title="Copy to Clipboard">
                                <span class="fa fa-files-o fa-lg text-dark" />
                            </argon-button>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <router-link class="nav-link" to="/tracking/tracking-tier-bawah">
                    <argon-button color="primary" @click="modal.detail = false">
                        Cari PO
                    </argon-button>
                </router-link>
                <argon-button color="danger" @click="modal.detail = false">
                    Kembali
                </argon-button>
            </template>
        </modal-comp>
    </div>
</template>

<script>
import d$po from '@/stores/dashboard/po';
import d$item from '@/stores/dashboard/item';
import ArgonButton from '@/components/ArgonButton.vue';
import { mapActions, mapState } from "pinia";
import auth from '../../router/routes/auth';

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
        // filterDetailItem: {
        //     id_item: null,
        //     id_item_detail: null
        // },
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
                    name: 'd_order.d_item.unit',
                    th: 'Satuan',
                    render: ({ d_order }) => d_order.d_item.unit
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
                    text: 'Edit',
                    color: 'primary',
                    event: 'edit',
                },
                {
                    text: 'Detail',
                    color: 'warning',
                    event: 'detail',
                }
            ],
        },

        // UI
        modal: {
            edit: false,
            add: false,
            detail: false,
            confirm: false,
        },
    }),
    computed: {
        ...mapState(d$po, ['g$list_po_detail', 'g$get_po_detail', 'g$po']),
        ...mapState(d$item, ['g$item', 'g$label']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listPoDetail({ id_po: this.$route.params.id });
    },
    methods: {
        ...mapActions(d$po, ['a$listPoDetail']),

        async triggerDetail({ id_po_detail, id_po }) {
            try {
                this.filter_po_detail = {
                    id_po: Number(id_po),
                    id_po_detail: Number(id_po_detail)
                }
                this.$router.push({ name: 'Edit Informasi PO', params: { id_po, id_po_detail } })
            } catch (e) {
                console.error(e);
            }
        },
        async triggerEdit() {
            try {
                this.modal.edit = false;
                this.$router.push({ name: 'Update Produksi', params: { id_item: this.g$label.id_item, id_item_detail: this.g$label.id_item_detail } })
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>