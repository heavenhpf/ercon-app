<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$list_po_detail" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <!-- <modal-comp v-model:show="modal.add">
            <template #header>
                <h2 class="modal-title">Add New {{ pageTitle }}</h2>
            </template>
            <template v-if="modal.add" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input  pe="text" placeholder="Name" name="name" size="md">
                        </argon-input>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.add = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="addInquiry()">
                    Save Changes
                </argon-button>
            </template>
        </modal-comp> -->
        <modal-comp size="lg" v-model:show="modal.detail">
            <template #header>
                <h5 class="modal-title">Serial Number</h5><br>
                <h6 class="row">Deadline 30 September 2022</h6>
            </template>

            <!-- buat ngerubah detail -->
            <template size="lg" v-if="modal.detail" #body>
                <div class="row">
                    <h3 class="col-12">Roda Eco Tire
                    </h3>
                    <p>Eco tire didesain untuk meningkatkan efisiensi penggunaan bahan bakar. Tipe ban yang satu ini
                        dibuat dengan dilapisi silika agar cengkraman atau grip ke jalan jadi jauh lebih bagus. Rolling
                        resistance bisa berkurang dengan adanya lapisan silika tersebut, sehingga Anda tidak memerlukan
                        banyak bahan bakar.</p>
                </div>
            </template>
            <template #footer>
                <h5 style="text-align: left;">Informasi Item</h5>
                <argon-button style="text-align: left;" color="secondary" @click="modal.detail = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="editInquiry()">
                    Save Changes
                </argon-button>
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
        ...mapState(d$po, ['g$list_po_detail']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listPoDetail({ id_po: this.$route.params.id });
    },
    methods: {
        ...mapActions(d$po, ['a$listPoDetail']),


        // async init() {
        //     try {
        //         // await this.a$listPoDetail();
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },

        async triggerDetail({ }) {
            try {
                this.modal.detail = true;
            } catch (e) {
                console.error(e);
            }
        },
    }
};
</script>