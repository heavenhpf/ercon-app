<template>
    <div class="table-responsive p-0">
        <div class="card">
            <div class=" col-9 row">
                <div class="col-4 mt-4 ms-4">
                    <label>Filter Status</label>
                    <select @change="triggerOptions()" v-model="input.status" class="form-select form-select-md mb-3"
                        aria-label=".form-select-lg example">
                        <option>-- Semua --</option>
                        <option value="-1">Melewati Deadline</option>
                        <option value="0">Belum Deadline</option>
                        <option value="1">Progress Selesai</option>
                    </select>
                </div>
            </div>
            <data-table style="text-align:center ;" :index="false" :data="g$list_my_po" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" />
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$po from '@/stores/dashboard/po';
import auth from '@/router/routes/auth';

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
        ...mapState(d$po, ['g$po', 'g$list_po_detail', 'g$list_po', 'g$detail', 'g$progress', 'g$list_my_po']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listMyPo();
        // console.log(this.g$po)
    },
    methods: {
        ...mapActions(d$po, ['a$listAllPo', 'a$listPoDetail', 'a$listMyPo', 'a$inquiryEdit', 'a$inquiryDelete', 'a$inquiryDetail']),

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
                await this.a$listMyPo();
                // console.log(this.g$po)
            } catch (e) {
                console.error(e);
            }
        },

        async triggerOptions() {
            try {
                await this.a$listMyPo({status: Number(this.input.status)});
            } catch (e) {
                console.error(e);
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
    },
    watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
};
</script>  