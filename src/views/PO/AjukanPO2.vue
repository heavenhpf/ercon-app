<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="pb-0 text-start mb-4">
                    <h4 class="font-weight-bolder text-dark">Buat PO</h4>
                </div>
                <div class="d-flex justify-content-center mb-4">
                    <div class="row">
                        <h5 class="font-weight-bolder text-dark d-flex justify-content-center mb-4">Step Progress</h5>
                        <div class="row d-flex justify-content-center">
                            <div class="col-2 p-0">
                                <div class="row">
                                    <div class="d-flex justify-content-center mb-2">
                                        <input class="form-check-input" type="radio" name="radioNoLabel"
                                            id="radioNoLabel1" value="" aria-label="..." 
                                            style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;" disabled>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h6 class="text-dark text-center text-sm">Pilih Order</h6>
                                    </div>
                                </div>
                            </div>
                            <hr class="col-1 mt-3" style="border-top: 4px dotted;">
                            <div class="col-2 p-0">
                                <div class="row">
                                    <div class="d-flex justify-content-center mb-2">
                                        <input class="form-check-input" type="radio" name="radioNoLabel"
                                            id="radioNoLabel1" value="" aria-label="..." checked
                                            style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;" disabled>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h6 class="text-dark text-center text-sm">Input Order</h6>
                                    </div>
                                </div>
                            </div>
                            <hr class="col-1 mt-3" style="border-top: 4px dotted;">
                            <div class="col-2 p-0">
                                <div class="row">
                                    <div class="d-flex justify-content-center mb-2">
                                        <input class="form-check-input" type="radio" name="radioNoLabel"
                                            id="radioNoLabel1" value="" aria-label="..."
                                            style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;" disabled>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h6 class="text-dark text-center text-sm">Preview PDF</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-2 d-flex justify-content-between">
                    <router-link class="nav-link p-0 mb-3" to="/po/ajukan-po-1">
                        <argon-button color="warning">
                            Kembali
                        </argon-button>
                    </router-link>

                        <argon-button color="primary" @click="nextStep()">
                            Selanjutnya
                        </argon-button>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nomor PO</label>
                                <argon-input v-model="input.po_number" type="text" />
                            </div>
                            <div class="row col-12 mb-2">
                                <div class="col-12" style="overflow-x:scroll;">
                                    <table class="table table-hover text-center align-items-center">
                                        <thead>
                                        <tr>
                                            <th scope="col" class="p-lg-3 p-md-3 p-2 text-sm">No</th>
                                            <th scope="col" class="p-lg-3 p-md-3 p-2 text-sm">Nomor Order</th>
                                            <th scope="col" class="p-lg-3 p-md-3 p-2 text-sm">Nama Barang</th>
                                            <th scope="col" class="p-lg-3 p-md-3 p-2 text-sm">Tanggal Order</th>
                                            <th scope="col" class="p-lg-3 p-md-3 p-2 text-sm">Total</th>
                                            <th scope="col" class="p-lg-3 p-md-3 p-2 text-sm">Aksi</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item, index) in filterOrder" :key="index">
                                            <th scope="row" class="p-lg-3 p-md-3 p-1 text-sm">{{ index + 1 }}</th>
                                            <td class="p-lg-3 p-md-3 p-2 text-sm">{{ item.order_number }}</td>
                                            <td class="p-lg-3 p-md-3 p-2 text-sm">{{ item.d_item?.name }}</td>
                                            <td class="p-lg-3 p-md-3 p-2 text-sm">{{ new Date(item.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' }) }}</td>
                                            <td class="p-lg-3 p-md-3 p-2 text-sm">{{ item.quantity}}</td>
                                            <td class="p-lg-3 p-md-3 p-2 text-sm">
                                                <argon-button @click="triggerDeleteOrder(item.id_order)" size="md" color="danger">
                                                    <span class="fa fa-trash fa-sm me-lg-2 me-md-2" />
                                                    Batal
                                                </argon-button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="example-text-input" class="form-control-label text-sm">Deadline
                                    Pembuatan</label>
                                <base-input label="Date picker">
                                    <flat-picker placeholder="yyyy-mm-dd" slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="{allowInput: true}"
                                                class="form-control datepicker"
                                                @change="changeTime()"
                                                v-model="input.deadline"
                                                >
                                                <span class="fa fa-calendar"></span>
                                    </flat-picker>
                                </base-input>
                            </div>


                            <div id="liveToast"
                                class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-success"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        {{ input.po_number }} Berhasil Ditambahkan
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
                                        Form Harus Diisi
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<script>
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';
import ArgonRadio from "@/components/ArgonRadio.vue";
import ArgonProgress from "@/components/ArgonProgress.vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import d$user from '@/stores/dashboard/user';
import d$order from '@/stores/dashboard/order';
import d$po from '@/stores/dashboard/po';
import { mapActions, mapState } from 'pinia';
import VueMultiselect from 'vue-multiselect';

export default {
    name: 'ajukan-po-2',
    data: () => ({
        pageTitle: 'po',
        // Input
        input: {
            po_number: '',
            // s_company_d_po_order_toTos_company: '',
            // list_order: [],
            deadline: '',
            file: null,
        },
        filterOrder: [],
        quantity:{},
        selectQuantity: {},
        selected: null,
        options: [],
        deadline: '',
        objectURL: null,
        accepts: ["application/pdf"].join(","),
        file : null,
        orientation: null,
        // dt: {
        //     action: [
        //         {
        //             text: 'Edit',
        //             color: 'primary',
        //             event: 'detail',
        //         },
        //         {
        //             text: 'Delete',
        //             color: 'danger',
        //             event: 'delete',
        //         },
        //     ],
        // },

        // UI
        modal: {
            add: false,
            detail: false,
            confirm: false,
            editQuantity: false,
            previewDoc: false,
        },
    }),

    components: {
        ArgonInput,
        ArgonButton,
        ArgonRadio,
        ArgonProgress,
        flatPicker,
        VueMultiselect,
    },

    computed: {
        ...mapState(d$user, ['g$list', 'g$detail']),
        ...mapState(d$order, ['g$getOrder', 'g$listSelectedOrder']),
        ...mapState(d$po, ['g$DocPO', 'g$AddPO']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        this.filterOrder = this.g$listSelectedOrder;
    },
    methods: {
        ...mapActions(d$order, ['a$getOrder', 'a$inquiryEditOrder', 'a$inquiryAddPO']),
        ...mapActions(d$po, ['a$inquiryAddDocPO', 'a$inquiryAddPO', 'a$storePoData']),

        nameWithLang ({ name }) {
            return `${name}`
        },
        clear() {
            this.input = {
                id: null,
                name: '',
                username: '',
                level: '',
            };
        },
        async changeTime(){
            const convertDate = new Date(this.input.deadline);
            this.deadline = convertDate.toISOString();
            console.log(this.deadline);
        },

        async changeFile(event){
            if (this.objectURL) {
                URL.revokeObjectURL(this.objectURL);
            }
            const files = event.target.files[0];
            this.name = files.name;
            this.type = files.type;
            this.file = event.target.files[0];
            this.objectURL = URL.createObjectURL(files);
            if(this.type == "application/pdf"){
                let element = document.getElementById("preview");
                let element1 = document.getElementById("buttonFile");
                element1.removeAttribute("hidden");
                element.removeAttribute("hidden");
            }else{
                let element = document.getElementById("preview");
                let element1 = document.getElementById("buttonFile");
                element1.setAttribute("hidden", 'hidden');
                element.setAttribute("hidden", "hidden");
                this.input.file = null;
                this.file = null;

                const toastLiveExample = document.getElementById('liveToastError')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
            }
        },

        async submitFile(){
            if(this.type == "application/pdf"){
                let data = new FormData();
                data.append('file', this.file);
                await this.a$inquiryAddDocPO(data);
                console.log(this.g$DocPO);

                let element = document.getElementById("preview");
                let element1 = document.getElementById("buttonFile");
                element1.setAttribute("hidden", 'hidden');
                element.setAttribute("hidden", "hidden");
            }
            else{
                const toastLiveExample = document.getElementById('liveToastError')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
            }
            
        },

        async nextStep() {
            try {
                const data = {
                    po_number: this.input.po_number,
                    order_to: Number(this.$route.params.order_to),
                    order: this.filterOrder,
                    deadline: this.deadline,
                };
                if(this.input.po_number == '' || this.deadline == ''){
                    const toastLiveExample = document.getElementById('liveToastError')
                    const toast = new bootstrap.Toast(toastLiveExample)
                    toast.show()
                }else{
                    await this.a$storePoData(data);
                    this.$router.push({ name: 'Ajukan PO 3'});
                }
            } catch (error) {
                console.error(error);
                
            }
        },

        
        async triggerEditQuantity(id_order){
            this.modal.editQuantity = true;
            this.quantity = this.g$getOrder;
        },
        async triggerDeleteOrder(id_order){
            this.filterOrder = this.filterOrder.filter(item => item.id_order != id_order);
        },
        async searchOrder(){
            try {
                const { selectedOrder} = this.filterOrder;
                const data = {
                    order_number: selectedOrder
                };
                console.log(data);
                await this.a$getOrder(data);
                this.filterOrder.order.push(this.g$getOrder);
                console.log(this.filterOrder.order);
                
            } catch (e) {
                console.error(e);
            } 
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
        async addPO(){
            try {
                const data = {
                    po_number: this.input.po_number,
                    order_to: Number(this.$route.params.order_to),
                    id_doc: this.g$DocPO.id_doc,
                    order: this.filterOrder,
                    deadline: this.deadline,
                };
                console.log(data);
                await this.a$inquiryAddPO(data);
                console.log(`Add ${this.pageTitle} Succeed!`);
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                    this.$router.push({ name: 'Tracking Saya' });
                }, 1000);
            } catch (e) {
                console.error(e);
            } 
        },
        async editInquiry() {
            try {
                const { id, name, address, phone } = this.input;
                const data = {
                    name,
                    address, phone
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
                const { id_user } = this.input;
                await this.a$inquiryDel(id_user);
                this.modal.confirm = false;
                console.log(`Delete ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },

        async triggerDetail({ id_user, name, address, phone }) {
            try {
                this.input = {
                    id: id_user,
                    name,
                    address,
                    phone,
                };
                this.modal.detail = true;
            } catch (e) {
                console.error(e);
            }
        },
        async triggerDelete({ id_user }) {
            try {
                this.input = {
                    id_user
                };
                this.modal.confirm = true;
            } catch (e) {
                console.error(e);
            }
        },
        async triggerOptions() {
            try {
                this.temp = this.g$listCompanyBelow;
                this.temp = this.temp.map((item) => {
                    return {
                        id_company: item.id_company,
                        name: item.name,
                    }
                });
                this.options = this.temp.filter((item) => {
                    return item.level !== 0;
                });
                console.log(this.temp);

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