<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$list" :columns="dt.column"
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

    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$item from '@/stores/dashboard/item';
import auth from '../../router/routes/auth';

export default {
    name: 'monitoring-table',
    data: () => ({
        pageTitle: 'monitoring-table',
        // Input
        input: {
            id: null,
            name: '',
        },
        filter: {
            tier: 2,
            category: 2,
        },
        // DataTable
        dt: {
            column: [
                {
                    name: 'id_item',
                    th: 'No',
                },
                {
                    name: 's_company.name',
                    th: 'Nama Perusahaan',
                    render: ({ s_company }) => s_company.name
                },
                {
                    name: 's_company.auth_user.level',
                    th: 'Tier',
                    render: ({ s_company }) => s_company.auth_user.level
                },
                {
                    name: 'quantity',
                    th: 'Jumlah Barang  ',
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
        ...mapState(d$item, ['g$list', 'g$detail']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listAllItem(this.filter);
    },
    methods: {
        ...mapActions(d$item, ['a$listAllItem', 'a$inquiryEdit', 'a$inquiryDelete', 'a$inquiryDetail']),

        clear() {
            this.input = {
                id: null,
                name: '',
                username: '',
                level: '',
                quantity: '',
                // tier: 2,
                // category: 1
            };
        },

        async init() {
            try {
                await this.a$listAllItem();
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

        async triggerDetail({ d_po, d_item, name, address, phone }) {
            try {
                this.input = {
                    id_po: d_po.id_po,
                    quantity: d_item.quantity,
                    name,
                    address,
                    phone,
                };
                this.modal.detail = true;
                this.$router.push({ name: 'TrackingDetail', params: { id: d_po.id_po } })
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