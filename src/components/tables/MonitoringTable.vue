<template>
    <div class="table-responsive p-0">
        <div class="card">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-10 mt-4 ms-4">
                    <label>Filter Kategori Item</label>
                    <select @change="triggerOptions()" v-model.number="filterCategory.selectedCategory"
                        class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                        <option>-- Semua Kategori --</option>
                        <option v-for='items in g$listCategory' v-bind:value="items.id_category">{{ items.name }}
                        </option>
                    </select>
                </div>
            </div>
            <data-table style="text-align:center ;" index="false" :data="g$listItem" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <modal-comp size="xl" v-model:show="modal.detail">
            <template #header>
                <h3 class="modal-title">{{ input.name }}</h3>
            </template>
            <template v-if="modal.detail" #body>
                <div class="row">
                    <div class="col-12">
                        <p>{{ input.desc }}</p>
                    </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <div class="col-8 d-lg-none d-md-none row align-items-center" style="padding: 5%;">
                        <span class="badge text-dark" style="background-color: yellow;">Buffer</span>
                        <div class="d-flex justify-content-center mt-2">
                            <img src="@/assets/img/illustrations/box.png" alt="warning"
                                style="width: 50%; height: 50%;">
                        </div>
                        <div class="mt-2 mb-2">
                            <h5 class="row justify-content-center">{{ input.quantity }} {{ g$item.unit }}</h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-9 col-md-9 col-12 float-lg-start">
                        <data-table style="text-align:center ;" index="false" :data="g$label" :columns="dt1.column"
                            @detail="triggerDetail" @delete="triggerDelete" />
                    </div>
                    <div class="col-3 d-lg-block d-md-block d-none row align-items-center" style="padding: 5%;">
                        <span class="badge text-dark" style="background-color: yellow;">Buffer</span>
                        <div class="d-flex justify-content-center mt-2">
                            <img src="@/assets/img/illustrations/box.png" alt="warning"
                                style="width: 80%; height: 80%;">
                        </div>
                        <div class="mt-2 mb-2">
                            <h5 class="row justify-content-center">{{ input.quantity }} {{ g$item.unit }}</h5>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.detail = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="triggerOrder()">
                    Order
                </argon-button>
            </template>
        </modal-comp>
        <modal-comp size="lg" v-model:show="modal.order">
            <template #header>
                <div class="mt-1">
                    <h3 class="modal-title">Order {{ g$item.name }}</h3>
                    <div class="mt-2">
                        <label for="exampleFormControlInput1" class="form-label">Nomor Order</label>
                        <argon-input v-model="input.no_order" type="text" placeholder="Nomor Order"></argon-input>
                    </div>
                </div>
                <div id="liveToast"
                    class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-success"
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            {{ input.name }} Berhasil di Order!
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
                <div id="liveToastError"
                    class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-danger"
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            Nomor Order sudah Pernah Digunakan!
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
            </template>
            <template v-if="modal.order" #body>
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-12">
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-4 pe-0">
                                <h6>Nama Perusahaan</h6>
                            </div>
                            <div class="col-1">
                                <h6 class="text-end">:</h6>
                            </div>
                            <div class="col-7">
                                <input class="form-control" type="text" v-model="g$item.s_company.name" readonly>
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-4">
                                <h6>Nama Barang</h6>
                            </div>
                            <div class="col-1">
                                <h6 class="text-end">:</h6>
                            </div>
                            <div class="col-7">
                                <input class="form-control" type="text" v-model="input.name" readonly>
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-4">
                                <h6>Jenis Barang</h6>
                            </div>
                            <div class="col-1">
                                <h6 class="text-end">:</h6>
                            </div>
                            <div class="col-7">
                                {{ g$item.ref_category?.name }}
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-4">
                                <h6>Jumlah Barang</h6>
                            </div>
                            <div class="col-1">
                                <h6 class="text-end">:</h6>
                            </div>
                            <div class="col-6">
                                <argon-input v-model.number="input.jml_barang" type="number" placeholder="Jumlah Barang"
                                    name="name" size="md">
                                </argon-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-lg-block d-md-block d-none align-self-center">
                        <img src="@/assets/img/illustrations/order.png" alt="warning" style="width: 110px; height: 110px;">
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="toggleOrderBack()">
                    Kembali
                </argon-button>
                <argon-button id="liveToastBtn" color="primary" @click="addInquiry()">
                    Order
                </argon-button>
            </template>
        </modal-comp>
    </div>
    <!-- <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button> -->
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$item from '@/stores/dashboard/item';
import d$order from '@/stores/dashboard/order';
import d$category from '@/stores/dashboard/category';
import d$auth from '@/stores/auth.d';
import auth from '../../router/routes/auth';

export default {
    
    // name: 'Monitoring',
    data: () => ({
        pageTitle: 'table-monitoring',
        // Input
        input: {
            text: ``,
            value: ``,
        },
        filter_detail: {
            id: null,
        },
        filterCategory: {
        },
        filterTier: {
        },
        // DataTable
        dt: {
            column: [
                {
                    name: 'name',
                    th: 'Nama Item',
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
                    th: 'Jumlah Item',
                },
                {
                    name: 'unit',
                    th: 'Satuan',
                },
            ],
            action: [
                {
                    text: 'Detail',
                    color: 'warning',
                    event: 'detail',
                },
            ],
        },
        dt1: {
            column: [
                {
                    name: 'd_po_detail.d_po.po_number',
                    th: 'Nomor PO',
                    render: ({ d_po_detail }) => d_po_detail.d_po.po_number
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
                    name: 'd_item.unit',
                    th: 'Satuan',
                    render: ({ d_item }) => d_item.unit
                },
                {
                    th: 'Label',
                    render: ({ }) => {
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
        ...mapState(d$category, ['g$listCategory']),
        ...mapState(d$item, ['g$listItem', 'g$item', 'g$label']),
        ...mapState(d$auth, ['g$user']),
        modals() {
            return Object.values(this.modal).includes(true);
        },

        filter() {
            return {
                tier: this.g$user.role + 1,
                category: null,
            }
        },
    },
    async mounted() {
        await this.a$categoryList();
        await this.a$listAllItem(this.filter);

    },
    methods: {
        ...mapActions(d$item, ['a$listAllItem', 'a$inquirygetItem']),
        ...mapActions(d$order, ['a$inquiryAddOrder']),
        ...mapActions(d$category, ['a$categoryList']),

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
        async addInquiry() {
            try {
                const { id_item, no_order, jml_barang } = this.input;
                const data = {
                    order_number: no_order,
                    quantity: jml_barang,
                };
                // const id = this.g$item.id_item;
                await this.a$inquiryAddOrder(id_item, data);
                const toastLiveExample = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
                setTimeout(() => {
                    this.modal.order = false;
                }, 1000);
            }
            catch (e) {
                console.error(e);
                const toastLiveExample = document.getElementById('liveToastError');
                const toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
            }
        },
        async toggleOrderBack() {
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
        async triggerDetail({ id_item, name, desc, quantity, s_company, ref_category }) {
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
        async triggerOptions() {
            try {
                const { selectedCategory } = this.filterCategory;
                const { selectedTier } = this.filterTier;
                const data = {
                    tier: this.g$user.role + 1,
                    category: selectedCategory,
                };
                // console.log(data.id_category);
                // console.log(data);
                await this.a$listAllItem(data);
            }
            catch (e) {
                console.log(e);
            }
        }
    },
    watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
};
</script>