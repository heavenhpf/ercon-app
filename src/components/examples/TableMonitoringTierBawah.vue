<template>
    <div class="table-responsive p-0">
        <div class="card">
            <div class=" col-9 row">
                <!-- <div class="col-4 mt-4 ms-4">
                    <label>Filter Tier</label>
                    <select v-model.number="filterTier.selectedTier" @change="triggerOptions()"
                        class="form-select form-select-md mb-3" aria-label=".form-select-lg example"
                        placeholder="-- Tier --">
                        <option v-for='tier in 3' v-bind:value="Number(tier)">
                        <option>{{ tier }}</option>
                        </option>
                    </select>
                </div> -->
                <div class="col-4 mt-4 ms-4">
                    <label>Filter Kategori</label>
                    <select @change="triggerOptions()" v-model.number="filterCategory.selectedCategory"
                        class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                        <option v-for='items in g$listCategory'
                            v-bind:value="{ id_category: items.id_category, name: items.name }" selected>
                        <option>{{ items.name }}</option>
                        </option>
                    </select>
                </div>
                <h4>{{ g$listCategory[selectedCategory] }}</h4>
            </div>
            <data-table style="text-align:center ;" :index="false" :data="g$listItem" :columns="dt.column"
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
                <div class="row">
                    <div class="col-9 float-lg-start">
                        <data-table style="text-align:center ;" :index="false" :data="g$label" :columns="dt1.column"
                            @detail="triggerDetail" @delete="triggerDelete" />
                    </div>
                    <div class="col-3 row align-items-center" style="padding: 5%;">
                        <span class=" badge text-dark" style="background-color: yellow;">Buffer</span>
                        <div class="d-flex justify-content-center mt-2">
                            <img src="@/assets/img/illustrations/box.png" alt="warning"
                                style="width: 80%; height: 80%;">
                        </div>
                        <div class="mt-2 mb-2">
                            <h4 class="row justify-content-center">{{ input.quantity }}</h4>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="primary" @click="triggerOrder()">
                    Order
                </argon-button>
                <argon-button color="secondary" @click="modal.detail = false">
                    Tutup
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
                    class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            {{ input.name }} Berhasil di Order
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
            </template>
            <template v-if="modal.order" #body>
                <div class="row">
                    <div class="col-10">
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h6>Nama Perusahaan :</h6>
                            </div>
                            <div class="col-6">
                                <input class="form-control" type="text" v-model="g$item.s_company.name" readonly>
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h6>Nama Barang :</h6>
                            </div>
                            <div class="col-6">
                                <input class="form-control" type="text" v-model="input.name" readonly>
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h6>Jenis Barang :</h6>
                            </div>
                            <div class="col-6">
                                <!-- <input class="form-control" type="text" v-model="g$item.ref_category.name" readonly> -->
                                {{ input.id_item === g$item.id_item ? g$item.ref_category.name :
                                        g$item.ref_category.name
                                }}
                            </div>
                        </div>
                        <div class="row align-items-center mt-4 mb-4">
                            <div class="col-5">
                                <h6>Jumlah Barang :</h6>
                            </div>
                            <div class="col-6">
                                <argon-input v-model.number="input.jml_barang" type="number" placeholder="Jumlah Barang"
                                    name="name" size="md">
                                </argon-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 row align-items-center mr-4">
                        <div class="mt-2 mb-2">
                            <img src="../../assets/img/illustrations/order.png" alt="warning"
                                style="width: 110px; height: 110px;">
                        </div>
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
import auth from '../../router/routes/auth';

export default {
    // name: 'Monitoring',
    data: () => ({
        pageTitle: 'Monitoring',
        // Input
        input: {
            text: ``,
            value: ``,
        },
        filter: {
            tier: 2,
            category: 2,
        },
        filter_detail: {
            id: null,
        },
        filterCategory: {
            value: ``,
        },
        filterTier: {
            value: ``,
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
        modals() {
            return Object.values(this.modal).includes(true);
        }
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
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                    this.$router.push({ name: 'Default' });
                }, 1000);
            }
            catch (e) {
                console.error(e);
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
                    tier: selectedTier,
                    category: selectedCategory.id_category,
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