<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                 <div class="pb-0 text-start mb-4">
                    <h4 class="font-weight-bolder text-dark">Buat PO</h4>
                </div>
                <!-- <div id="progress">
                    <div id="progress-bar"></div>
                    <ul id="progress-num">
                        <li class="step active">1</li>
                        <li class="step">2</li>
                    </ul>
                </div>    

                <button id="progress-prev" class="btn" disabled>Prev</button>
                <button id="progress-next" class="btn">Next</button> -->

                <!-- <modal-comp size="md" v-model:show="modal.editQuantity">
                    <template #header>
                        <h4 class="modal-title">Edit Jumlah Barang</h4>
                    </template>
                    <template v-if="modal.editQuantity" #body>
                        <label for="example-text-input" class="form-control-label text-sm">Jumlah Barang</label>
                        <argon-input v-model.number="quantity.quantity"  type="text" />
                        <argon-input v-model.number="quantity.id_order"  type="text" hidden/>
                    </template>
                    <template #footer>
                        <argon-button color="primary" @click="editOrder()">
                            Order
                        </argon-button>
                        <argon-button color="secondary" @click="modal.editQuantity = false">
                            Close
                        </argon-button>
                    </template>
                </modal-comp>   -->
                <div class="card">
                    <!-- <div class="card">
                        <data-table :index="false" :data="g$list" @detail="triggerDetail" @delete="triggerDelete" />
                    </div> -->
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nomor PO</label>
                                <argon-input v-model="input.po_number" type="text" />
                            </div>
                            <!-- <div class="mb-4">
                                <label for="example-text-input" class="form-control-label text-sm">Tujuan
                                    Pemesanan</label>
                                <VueMultiselect
                                @click="triggerOptions()"
                                v-model="selected"
                                :options="options"
                                :custom-label="nameWithLang"
                                placeholder="Select one"
                                label="name"
                                track-by="name">
                                </VueMultiselect>
                                <span >{{selected}}</span>
                            </div> -->
                            <div class="row col-12 mb-2">
                                <!-- <label for="example-text-input" class="form-control-label text-sm">Nomor Order</label>
                                <div class="col-10">
                                    <argon-input v-model="filterOrder.selectedOrder" type="text" />
                                </div>
                                <div class="col-2">
                                    <argon-button @click="searchOrder()" size="md" color="primary" type="button">Tambah</argon-button>
                                </div> -->
                                <div class="col-11">
                                    <table class="table table-hover text-center align-items-center">
                                        <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Nomor Order</th>
                                            <th scope="col">Nama Barang</th>
                                            <th scope="col">Tanggal Order</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item, index) in filterOrder.order" :key="index">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>{{ item.order_number }}</td>
                                            <td>{{item.d_item?.name}}</td>
                                            <td>{{ new Date(item.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' }) }}</td>
                                            <td>{{ item.quantity}}</td>
                                            <td>
                                                <argon-button  @click="triggerEditQuantity(item.order_number)" size="md" color="primary">
                                                    <span class="fa fa-pen fa-sm me-2"/>
                                                    Edit
                                                </argon-button>
                                                <argon-button @click="triggerDeleteOrder(item.id_order)" size="md" color="danger" class="ms-2">
                                                    <span class="fa fa-trash fa-sm me-2" />
                                                    Hapus
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
                                    <flat-picker  placeholder="yyyy-mm-dd" slot-scope="{focus, blur}"
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
                            <div class="col-12 mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Dokumen
                                    PO</label>
                                <argon-input type="file" v-model="input.file" id="file" @change="changeFile($event)" :accept="accepts" />
                            </div>
                            <div id="liveToast"
                                class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
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
                                class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-danger"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        File Harus PDF
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                            <iframe id="preview" hidden style="width:100%; height: 400px;" :src="objectURL"></iframe>
                            <div class="col-lg-8 col-md-9 mb-5 mt-4">
                                <argon-button id="buttonFile" hidden @click="submitFile" size="md" color="primary" type="button">Simpan</argon-button>
                            </div>
                            <div id="liveToast"
                                class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
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
                                class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-danger"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        File Harus PDF
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                            <iframe id="preview" hidden style="width:100%; height: 400px;" :src="objectURL"></iframe>
                            <div class="col-lg-8 col-md-9 mb-5 mt-4">
                                <argon-button id="buttonFile" hidden @click="submitFile" size="md" color="primary" type="button">Simpan</argon-button>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9">
                            <argon-button @click="addPO()" size="md" color="primary">
                                Buat PO
                            </argon-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<!-- <style>
#progress {
  position: relative;
  margin-bottom: 30px;   
}

#progress-bar {
  position: absolute;
  background: lightseagreen;
  height: 5px;
  width: 0%;
  top: 50%;
  left: 0;
}

#progress-num {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

#progress-num::before {
  content: "";
  background-color: lightgray;
  position: absolute;
  top: 50%;
  left: 0;
  height: 5px;
  width: 100%;
  z-index: -1;
}

#progress-num .step {
  border: 3px solid lightgray;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #fff;
  font-family: sans-serif;
  font-size: 14px;    
  position: relative;
  z-index: 1;
}

#progress-num .step.active {
  border-color: lightseagreen;
  background-color: lightseagreen;
  color: #fff;
}
</style> -->

<script>
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';
import ArgonRadio from "@/components/ArgonRadio.vue";
import ArgonProgress from "@/components/ArgonProgress.vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import d$user from '@/stores/dashboard/user';
import d$order from '@/stores/dashboard/order';
import d$company from '@/stores/dashboard/company';
import d$po from '@/stores/dashboard/po';
import { mapActions, mapState } from 'pinia';
import VueMultiselect from 'vue-multiselect';

// const progressBar = document.getElementById("progress-bar");
// const progressNext = document.getElementById("progress-next");
// const progressPrev = document.getElementById("progress-prev");
// const steps = document.querySelectorAll(".step");
// let active = 1;

// progressNext.addEventListener("click", () => {
//   active++;
//   if (active > steps.length) {
//     active = steps.length;
//   }
//   updateProgress();
// });

// progressPrev.addEventListener("click", () => {
//   active--;
//   if (active < 1) {
//     active = 1;
//   }
//   updateProgress();
// });

// const updateProgress = () => {
//   // toggle active class on list items
//   steps.forEach((step, i) => {
//     if (i < active) {
//       step.classList.add("active");
//     } else {
//       step.classList.remove("active");
//     }
//   });
//   // set progress bar width  
//   progressBar.style.width = 
//     ((active - 1) / (steps.length - 1)) * 100 + "%";
//   // enable disable prev and next buttons
//   if (active === 1) {
//     progressPrev.disabled = true;
//   } else if (active === steps.length) {
//     progressNext.disabled = true;
//   } else {
//     progressPrev.disabled = false;
//     progressNext.disabled = false;
//   }
// };

export default {
    name: 'ajukan-po',
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
        filterOrder: {
            selectedOrder: '',
            order: [],
        },
        quantity:{},
        selectQuantity: {},
        selected: null,
        options: [],
        deadline: '',
        objectURL: null,
        accepts: ["application/pdf"].join(","),
        file : null,
        
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
        ...mapState(d$order, ['g$getOrder']),
        ...mapState(d$company, ['g$listCompanyBelow']),
        ...mapState(d$po, ['g$DocPO', 'g$AddPO']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        // await this.a$inquiryList();
        // console.log(this.g$getOrder);
        await this.a$listCompanyBelow();
        
    },
    methods: {
        // ...mapActions(d$user, ['a$inquiryList', 'a$inquiryEdit', 'a$inquiryDel', 'a$inquiryDetail', 'a$inquiryAdd']),
        ...mapActions(d$order, ['a$getOrder', 'a$inquiryEditOrder', 'a$inquiryAddPO']),
        ...mapActions(d$po, ['a$inquiryAddDocPO', 'a$inquiryAddPO']),
        ...mapActions(d$company, ['a$listCompanyBelow']),

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

        // async init() {
        //     try {
        //         await this.a$inquiryList();
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },

        // async addInquiry() {
        //     try {
        //         const { username, password, name, level, address, phone } = this.input;
        //         const data = {
        //             username, password, level: parseInt(level), name, address, phone
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
        async triggerEditQuantity(order_number){
            await this.a$getOrder({order_number});
            this.modal.editQuantity = true;
            this.quantity = this.g$getOrder;
        },
        async triggerDeleteOrder(id_order){
            // this.filterOrder.order.forEach((item, index) => {
            //     if(item.id == this.filterOrder.selectedOrder.id){
            //         this.filterOrder.order.splice(index, 1);
            //     }
            // });
            // console.log(this.filterOrder.order);
            this.filterOrder.order = this.filterOrder.order.filter(item => item.id_order != id_order);

            console.log(this.filterOrder.order);
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
                    order_to: this.selected.id_company,
                    id_doc: this.g$DocPO.id_doc,
                    order: this.filterOrder.order,
                    deadline: this.deadline,
                };
                console.log(data);
                await this.a$inquiryAddPO(data);
                console.log(`Add ${this.pageTitle} Succeed!`);
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()       
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