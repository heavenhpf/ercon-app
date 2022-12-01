<template>
    <div class="table-responsive p-0">
        <div class="card">
            <div class=" col-9 row">
                <div class="col-4 mt-4 ms-4" v-if="this.g$user.role === 0">
                    <label>Filter Tier</label>
                    <select @change="triggerOptions()" v-model="input.tier" class="form-select form-select-md mb-3"
                        aria-label=".form-select-lg example">
                        <option v-bind:value="1" >Tier 2</option>
                        <option v-bind:value="2">Tier 3</option>
                    </select>
                </div>
                <div class="col-4 mt-4 ms-4">
                    <label>Filter Status</label>
                    <select @change="triggerOptions()" v-model="input.status" class="form-select form-select-md mb-3"
                        aria-label=".form-select-lg example">
                        <option>-- Semua Status --</option>
                        <option value="-1">Melewati Deadline</option>
                        <option value="0">Belum Deadline</option>
                        <option value="1">Progress Selesai</option>
                    </select>
                </div>
            </div>
            <data-table style="text-align:center ;" index="false" :data="g$list_po" :columns="dt.column"
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
                <argon-button color="primary" @click="addInquiry()">
                    Save Changes
                </argon-button>
                <argon-button color="secondary" @click="modal.add = false">
                    Close
                </argon-button>
            </template>
        </modal-comp>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$po from '@/stores/dashboard/po';
import d$auth from '@/stores/auth.d';
import auth from '../../router/routes/auth';

const statusPO = {
    '0': "Belum Deadline",
    '-1': "Melewati Deadline",
    '1': "Progress Selesai"
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
                    th: 'Perusahaan Supplier',
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
                    name: 'deadline',
                    th: 'Deadline',
                    render: ({ deadline }) => {
                        return new Date(deadline).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })
                    }
                },
                {
                    name: 'status',
                    th: 'Status',
                    render: ({ status }) => {
                        if (status == 0) {
                            return `<span class="badge badge-pill badge-info">${statusPO[status]}</span>`
                        } else if (status == 1) {
                            return `<span class="badge badge-pill badge-success">${statusPO[status]}</span>`
                        } else {
                            return `<span class="badge badge-pill badge-danger">${statusPO[status]}</span>`
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
        ...mapState(d$po, ['g$po', 'g$list_po', 'g$detail', 'g$progress']),
        ...mapState(d$auth, ['g$user']),
        modals() {
            return Object.values(this.modal).includes(true);
        },
        filter() {
            return {
                tier: this.g$user.role + 1,
            }
        }
    },
    async mounted() {
        this.filter.tier = this.g$user.role + 1;
        await this.a$listAllPo(this.filter);
        // console.log(this.g$po)
    },
    methods: {
        ...mapActions(d$po, ['a$listAllPo', 'a$inquiryDetail']),

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
                this.modal.detail = false;
                this.$router.push({ name: 'Tracking Detail', params: { id: id_po } })
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
        async triggerOptions() {
            try {
                if (this.g$user.role === 0) {
                    this.filter = {
                    tier: Number(this.input.tier),
                    status: Number(this.input.status)
                    }
                } else {
                    this.filter = {
                        tier: this.g$user.role + 1,
                        status: Number(this.input.status)
                    };
                };
                await this.a$listAllPo(this.filter);
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