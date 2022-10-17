<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$list_po" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <modal-comp v-model:show="modal.add">
            <template #header>
                <h2 class="modal-title">Add New {{ pageTitle }}</h2>
            </template>
            <template v-if="modal.add" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.name" type="text" placeholder="Name" name="name" size="md">
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
        </modal-comp>
        <!-- <modal-comp v-model:show="modal.detail">
            <template #header>
                <h3 class="modal-title">{{ pageTitle }} Details</h3>
            </template>
            <template v-if="modal.detail" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.username" type="text" placeholder="Username" name="username"
                            size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.name" type="text" placeholder="Name" name="name" size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.address" type="text" placeholder="Address" name="address" size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.phone" type="text" placeholder="Phone" name="phone" size="md">
                        </argon-input>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.detail = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="editInquiry()">
                    Save Changes
                </argon-button>
            </template>
        </modal-comp> -->
        <!-- <modal-comp v-model:show="modal.confirm">
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
        </modal-comp> -->
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$po from '@/stores/dashboard/po';
import auth from '../../router/routes/auth';

const statusPO = {
    0: "Belum Deadline",
    1: "Melewati Deadline",
    2: "Progress Selesai"
}

export default {
    name: 'Tracking',
    data: () => ({
        pageTitle: 'Tracking',
        // Input
        input: {
            id: null,
            name: '',
        },
        filter: {
            tier: 1,
            status: 1,

        },
        filterDetail: {
            id_po: 1,
        },
        // DataTable
        dt: {
            column: [
                {
                    name: 'po_number',
                    th: 'Nomor PO',
                },
                {
                    name: 's_company_d_po_order_toTos_company.name',
                    th: 'Nama Perusahaan',
                    render: ({ s_company_d_po_order_toTos_company }) => s_company_d_po_order_toTos_company.name
                },
                {
                    name: 'progress',
                    th: 'Capaian',
                    render: ({ progress }) => {
                        return `<progress  value="${progress}" max="1">${progress}%</progress>`
                    }
                },
                {
                    name: 'status',
                    th: 'Status',
                    render: ({ status }) => {
                        if(status == 0){
                            return `<span class="badge badge-pill badge-info">${statusPO[status]}</span>`
                        }else if(status == 1){
                            return `<span class="badge badge-pill badge-danger">${statusPO[status]}</span>`
                        }else{
                            return `<span class="badge badge-pill badge-success">${statusPO[status]}</span>`
                        }
                    }
                },
            ],
            action: [
                {
                    text: 'Detail',
                    color: 'warning',
                    event: 'detail',
                },
                // {
                //     text: 'Delete',
                //     color: 'danger',
                //     event: 'delete',
                // },
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
        ...mapState(d$po, ['g$po', 'g$list_po_detail', 'g$list_po', 'g$detail', 'g$progress']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listAllPo(this.filter);
        await this.a$listPoDetail(this.filterDetail);
        // console.log(this.g$po)
    },
    methods: {
        ...mapActions(d$po, ['a$listAllPo', 'a$listPoDetail', 'a$inquiryEdit', 'a$inquiryDelete', 'a$inquiryDetail']),

        clear() {
            this.input = {
                id: null,
                name: '',
                username: '',
                level: '',
            };
        },

        async init() {
            try {
                await this.a$listAllPo();
                await this.a$listPoDetail();
                // console.log(this.g$po)
            } catch (e) {
                console.error(e);
            }
        },

        async addInquiry() {
            try {
                const { name } = this.input;
                const data = {
                    name,
                };
                await this.a$inquiryAdd(data);
                this.modal.add = false;
                console.log(`Add ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },
        async editInquiry() {
            try {
                const { id, name } = this.input;
                const data = {
                    name,
                };
                await this.a$inquiryEdit(id, data);
                this.modal.detail = false;
                console.log(`Edit ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },
        async delInquiry() {
            try {
                const { id } = this.input;
                await this.a$inquiryDel(id);
                this.modal.confirm = false;
                console.log(`Delete ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },

        async triggerDetail({ id_po }) {
            try {
                this.input = {
                    id: id_po,
                };
                this.modal.detail = true;
                this.$router.push({ name: 'TrackingDetail', params: { id: id_po } })
                console.log(this.$route.params.id);
            } catch (e) {
                console.error(e);
            }
        },
        async triggerDelete({ id }) {
            try {
                await this.a$inquiryDetail(id);
                this.input = this.g$detail;
                this.modal.confirm = true;
            } catch (e) {
                console.error(e);
            }
        },
    },
    watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
};
</script>