<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="pb-0 text-start mb-4">
                    <h4 class="font-weight-bolder text-dark">Pilih Order</h4>
                </div>
                <div class="d-flex justify-content-center mb-3">
                    <div class="row">
                        <h5 class="font-weight-bolder text-dark d-flex justify-content-center mb-4">Step Progress</h5>
                        <div class="d-flex justify-content-center">
                            <hr class="col-1 mt-3" style="z-index:-99; position:absolute; border-top: 4px dotted;">
                            <div class="row">
                                <div class="col-6">
                                    <div class="row">
                                        <div class="d-flex justify-content-center">
                                            <input class="form-check-input" type="radio" name="radioNoLabel"
                                                id="radioNoLabel1" value="" aria-label="..." checked
                                                style="width: 35px; height: 35px; opacity: 1;" disabled>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <h6 class="text-dark">Pilih Order</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="row">
                                        <div class="d-flex justify-content-center">
                                            <input class="form-check-input" type="radio" name="radioNoLabel"
                                                id="radioNoLabel1" value="" aria-label="..."
                                                style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;" disabled>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <h6 class="text-dark">Buat PO</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-4">
                        <label>Filter Berdasarkan Company</label>
                        <select @change="triggerChange()" v-model="input.company" class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                            <option v-for='company in g$listCompanyBelow' v-bind:value="company.id_company">{{ company.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-8 mt-4 d-flex flex-row-reverse bd-highlight">
                        <router-link class="nav-link" to="/po/ajukan-po-2">
                            <argon-button color="primary">
                                Selanjutnya
                            </argon-button>
                        </router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-2">
                        <p class="text-sm mb-0">(Centang order yang akan Anda masukkan)</p>
                    </div>
                    <!-- <div class="mb-3" v-for='order in g$listOrder' v-bind:value="company.id_company"> -->
                    <div class="row mb-3" v-for='order in g$listOrder'>
                        <div class="col-11">
                            <div class="card">
                                <div class="card-header p-3 pb-0">
                                    <div class="row">
                                        <div class="col-6">
                                            <p class="text-dark text-sm mb-0">Nomor Order</p>
                                            <h5 class="text-dark">{{ order.order_number }}</h5>
                                        </div>
                                        <div class="col-6 d-flex flex-row-reverse bd-highlight">
                                            <p class="text-dark text-sm mb-0">
                                                {{ new
                                                    Date(order.created_at).toLocaleDateString("id-ID", {
                                                        weekday: 'long', year: 'numeric', month:
                                                            'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <hr class="w-100 d-flex justify-content-center mt-1 mb-2">
                                </div>
                                <div class="card-body p-3 pt-0 pb-0">
                                    <div class="row">
                                        <div class="col-9">
                                            <h6 class="text-dark mb-0">{{ order.d_item.name }}</h6>
                                            <p class="text-dark"><b>{{ order.quantity }}</b> {{ order.d_item.unit }}</p>
                                        </div>
                                        <div class="col-3 mt-3">
                                            <argon-button color="primary" class="me-3" @click="triggerEditQuantity(order.order_number)">
                                                Edit
                                            </argon-button>
                                            <argon-button color="danger" size="md">
                                                Hapus
                                            </argon-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1 mt-5 d-flex justify-content-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                    style="width: 30px; height: 30px;">
                            </div>
                        </div>
                    </div>
                    <modal-comp size="md" v-model:show="modal.editQuantity">
                        <template #header>
                            <h4 class="modal-title">Edit Jumlah Barang</h4>
                        </template>
                        <template v-if="modal.editQuantity" #body>
                            <label for="example-text-input" class="form-control-label text-sm">Jumlah Barang</label>
                            <argon-input v-model.number="quantity.quantity" type="text" />
                            <argon-input v-model.number="quantity.id_order" type="text" hidden/>
                        </template>
                        <template #footer>
                            <argon-button color="primary" @click="editOrder()">
                                Order
                            </argon-button>
                            <argon-button color="secondary" @click="modal.editQuantity = false">
                                Close
                            </argon-button>
                        </template>
                    </modal-comp>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from '@/components/ArgonButton.vue';
import d$company from '@/stores/dashboard/company';
import d$order from '@/stores/dashboard/order';
import d$category from '@/stores/dashboard/category';
import d$auth from '@/stores/auth.d';
import auth from '@/router/routes/auth';

export default {
    name: "ajukan-po-1",
    data: () => ({
        // Input
        input: {
            
        },
        modal: {
            editQuantity: false,
        },
    }),
    computed: {
        ...mapState(d$company, ['g$listCompanyBelow']),
        ...mapState(d$order, ['g$listOrder']),
        modals() {
            return Object.values(this.modal).includes(true);
        },

        // filter() {
        //     return {
        //         tier: this.g$user.role + 1,
        //         category: null,
        //     }
        // },
    },
    components: {
        ArgonCheckbox,
        ArgonButton,
    },
    modals() {
            return Object.values(this.modal).includes(true);
    },
    async mounted() {
        await this.a$listCompanyBelow();
    },
    methods: {
        ...mapActions(d$company, ['a$listCompanyBelow']),
        ...mapActions(d$order, ['a$listOrder']),

        async triggerChange() {
            try {
                await this.a$listOrder(Number(this.input.company));
            } catch (e) {
                console.error(e);
            }
        },

        async triggerEditQuantity(order_number){
            await this.a$listOrder({order_number});
            this.modal.editQuantity = true;
            this.quantity = this.g$listOrder;
        },

        async editOrder(){
            try {
                const { quantity, id_order } = this.quantity;
                const data = {
                    quantity: parseInt(quantity),
                };
                // console.log(data.id_order);
                await this.a$inquiryEditOrder(id_order, data);
                console.log(`Edit ${this.pageTitle} Succeed!`);
                // console.log(this.filterOrder.order);
                
            } catch (e) {
                console.error(e);
            } 
        },

        watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
    },
};
</script>