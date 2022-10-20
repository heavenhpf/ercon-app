<template>
    <div class="table-responsive p-0">
        <div class="card">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
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
                <argon-button color="primary" @click="triggerOrder()">
                    Order
                </argon-button>
                <argon-button color="secondary" @click="modal.detail = false">
                    Close
                </argon-button>
            </template>
        </modal-comp>

        <modal-comp size="lg" v-model:show="modal.order" >
            <template #header>
                <div class="mt-1">
                    <h3 class="modal-title">Order {{ g$item.name }}</h3>
                    <div class="mt-2">
                        <label for="exampleFormControlInput1" class="form-label">Nomor Order</label>
                        <argon-input v-model="input.no_order" type="text" placeholder="Nomor Order"></argon-input>
                    </div>
                </div>
            </template>

            <template v-if="modal.order"  #body>
                <div class="row">
                    <div class="col-10">
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h5>Nama Perusahaan :</h5>
                            </div>
                            <div class="col-6">
                                <input class="form-control" type="text" v-model="g$item.id_item" readonly>
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h5>Nama Barang :</h5>
                            </div>
                            <div class="col-6">
                                <input class="form-control" type="text" v-model="input.name" readonly>
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h5>Jenis Barang :</h5>
                            </div>
                            <div class="col-6">
                                <!-- <input class="form-control" type="text" v-model="g$item.ref_category.name" readonly> -->
                                {{input.id_item === g$item.id_item ? g$item.ref_category.name : g$item.ref_category.name}}
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h5>Jumlah Barang :</h5>
                            </div>
                            <div class="col-6">
                                <argon-input v-model.number="input.jml_barang" type="number"  placeholder="Jumlah Barang" name="name" size="md">
                                </argon-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 row align-items-center mr-4">
                        <div class="mt-2 mb-2">
                                <img src="../../assets/img/illustrations/order.png" alt="warning" style="width: 110px; height: 110px;">
                        </div>
                    </div>
                </div>

            </template>
            <template #footer>
                <argon-button color="primary" @click="addInquiry()">
                    Order
                </argon-button>
                <argon-button color="secondary" @click="toogleOrderBack()">
                    Kembali
                </argon-button>
            </template>
        </modal-comp>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$item from '@/stores/dashboard/item';
import d$order from '@/stores/dashboard/order';
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
            id: null,
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
        dt2: {
            column: {
                name: 'ref_category.name',
                th: 'category',
                render: ({ ref_category }) => ref_category.name
            }
        },
        // UI
        modal: {
            detail: false,
            order: false,
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
        console.log("ini g$label", this.g$label);
    },
    methods: {
        ...mapActions(d$item, ['a$listAllItem', 'a$inquirygetItem']),
        ...mapActions(d$order, ['a$inquiryAddOrder']),

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
        async addInquiry() {
            try {
                const { id_item, no_order, jml_barang } = this.input;
                const data = {
                    order_number: no_order,
                    quantity: jml_barang,
                };
                // const id = this.g$item.id_item;
                await this.a$inquiryAddOrder(id_item, data);
                this.modal.add = false;
                console.log(`Add ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            }
        },
        async toogleOrderBack() {
            try {
                this.modal.order = false;
                this.modal.detail = true;
            }
            catch (e) {
                console.log(e);
            }

        },
        async triggerOrder() {
            try {
                // const { id, name } = this.input;
                // const data = {
                //     name,
                // };
                // await this.a$inquiryEdit(id, data);
                this.modal.detail = false;
                // console.log(`Edit ${this.pageTitle} Succeed!`);
                this.modal.order = true;
            } catch (e) {
                console.error(e);
            }
        }, 
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

        async triggerDetail({id_item, name, desc, quantity, s_company, ref_category}) {
                try {
                    this.input = {
                        id_item,
                        name,
                        desc,
                        quantity,
                        s_company,
                        ref_category,
                    }
                    this.filter_detail.id = id_item;
                    await this.a$inquirygetItem(this.filter_detail);
                    this.modal.detail = true;
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