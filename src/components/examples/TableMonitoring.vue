<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$listItem" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <modal-comp size="lg" v-model:show="modal.detail" >
            <template #header>
                <h3 class="modal-title">{{ input.name }}</h3>

            </template>

            <template v-if="modal.detail"  #body>
                <div class="row">
                    <div class="col-12">
                        <p>{{input.desc}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-9 float-lg-start">
                        <data-table style="text-align:center ;" :index="false" :data="g$label" :columns="dt1.column"
                        @detail="triggerDetail" @delete="triggerDelete" />
                    </div>
                    <div class="col-3 row align-items-center" style="padding: 5%;">
                        <span class=" badge text-dark" style="background-color: yellow;">Buffer</span>

                        <div class="mt-2 mb-2">
                            <img src="../../assets/img/illustrations/box.png" alt="warning" style="width: 100px; height: 100px;">
                        </div>
                        <div class="mt-2 mb-2">
                            <h4 class="row justify-content-center">{{input.quantity}}</h4>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.detail = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="editInquiry()">
                    Order
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
    // name: 'Monitoring',
    data: () => ({
        pageTitle: 'Monitoring',
        // Input
        input: {
            id: null,
            name: '',
        },
        filter: {
            tier: 2,
            category: 2,
        },
        filter_detail: {
            id: 1,
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
                        name: 'name',
                        th: 'Nama Item',
                    },
                    {
                        name: 'quantity',
                        th: 'Jumlah Item',
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
        dt1: {
            column: [
                    {
                        name: 'd_po_detail.d_po.po_number',
                        th: 'Nomor PO',
                        render: ({ d_po_detail}) => d_po_detail.d_po.po_number
                    },
                    {
                        name: 'd_po_detail.d_po.s_company_d_po_order_fromTos_company.name',
                        th: 'Nama Perusahaan',
                        render: ({ d_po_detail }) => d_po_detail.d_po.s_company_d_po_order_fromTos_company.name
                    },
                    {
                        name: 'd_po_detail.quantity',
                        th: 'Update Produksi',
                        render: ({ d_po_detail }) => d_po_detail.quantity
                    },
                    {
                        name: 'd_po_detail.d_order.quantity',
                        th: 'Jumlah Pesanan',
                        render: ({ d_po_detail }) => d_po_detail.d_order.quantity
                    },
                    {
                        th: 'Label',
                        render: ({}) => {
                            return `<span class="badge bg-primary">Purchasing Order</span>`
                        }
                    },
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
        ...mapState(d$item, ['g$listItem', 'g$item', 'g$label']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listAllItem(this.filter);
        await this.a$inquirygetItem(this.filter_detail);
        console.log("ini g$label", this.g$label);
    },
    methods: {
        ...mapActions(d$item, ['a$listAllItem', 'a$inquirygetItem']),

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

        // async init() {
        //     try {
        //         await this.a$listAllItem();
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },
        // async addInquiry() {
        //     try {
        //         const { name } = this.input;
        //         const data = {
        //             name,
        //         };
        //         await this.a$inquiryAdd(data);
        //         this.modal.add = false;
        //         console.log(`Add ${this.pageTitle} Succeed!`);
        //     } catch (e) {
        //         console.error(e);
        //     } finally {
        //         await this.init();
        //     }
        // },
        // async editInquiry() {
        //     try {
        //         const { id, name } = this.input;
        //         const data = {
        //             name,
        //         };
        //         await this.a$inquiryEdit(id, data);
        //         this.modal.detail = false;
        //         console.log(`Edit ${this.pageTitle} Succeed!`);
        //     } catch (e) {
        //         console.error(e);
        //     } finally {
        //         await this.init();
        //     }
        // },
        // async delInquiry() {
        //     try {
        //         const { id } = this.input;
        //         await this.a$inquiryDel(id);
        //         this.modal.confirm = false;
        //         console.log(`Delete ${this.pageTitle} Succeed!`);
        //     } catch (e) {
        //         console.error(e);
        //     } finally {
        //         await this.init();
        //     }
        // },

        async triggerDetail({id_item, name, desc, quantity}) {
                try {
                    this.input = {
                        id_item,
                        name,
                        desc,
                        quantity
                    }
                    this.modal.detail = true;
                    console.log(g$label)
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