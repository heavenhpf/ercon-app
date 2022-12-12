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
                                            style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;"
                                            disabled>
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
                                            id="radioNoLabel1" value="" aria-label="..."
                                            style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;"
                                            disabled>
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
                                            id="radioNoLabel1" value="" aria-label="..." checked
                                            style="width: 35px; height: 35px; opacity: 1; border-style: solid; border-width: 5px; border-color: #3B82F6;"
                                            disabled>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h6 class="text-dark text-center text-sm">Preview PDF</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-2 d-flex">
                    <router-link class="nav-link p-0 mb-3"
                        :to="{ name: 'Ajukan PO 2', params: { order_to: this.g$po.order_to } }">
                        <argon-button color="warning">
                            Kembali
                        </argon-button>
                    </router-link>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <iframe id="preview" style="width:100%; height: 400px;" :src="objectURL"></iframe>
                        </div>
                        <div class="d-flex justify-content-center mt-4">
                            <argon-button @click="addPO()" size="lg" color="primary">
                                Buat PO
                            </argon-button>
                        </div>
                    </div>
                </div>

                <div id="liveToast"
                    class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-success"
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            {{ g$po.po_number }} Berhasil Ditambahkan
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
                            Gagal Menambahkan PO
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>

<script>
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';
import ArgonRadio from "@/components/ArgonRadio.vue";
import ArgonProgress from "@/components/ArgonProgress.vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import d$po from '@/stores/dashboard/po';
import d$company from '@/stores/dashboard/company';
import d$item from '@/stores/dashboard/item';
import { mapActions, mapState } from 'pinia';
import VueMultiselect from 'vue-multiselect';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name: 'ajukan-po-3',
    data: () => ({
        pageTitle: 'po',
        input: {
            po_number: '',
            deadline: '',
            file: null,
        },
        quantity: {},
        selectQuantity: {},
        selected: null,
        options: [],
        deadline: '',
        objectURL: null,
        accepts: ["application/pdf"].join(","),
        file: null,
        doc: null,

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
        ...mapState(d$po, ['g$po', 'g$DocPO']),
        ...mapState(d$company, ['g$listCompanyBelow', 'g$getMyCompany']),
        ...mapState(d$item, ['g$listDataItem']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$getMyCompany();
        await this.a$listCompanyBelow();

        this.doc = new jsPDF('landscape', 'pt', 'a4');
        this.doc.setFontSize(14).setFont('undefined', 'bold').text(40, 40, 'Purchase Order  ' + this.g$po.po_number)
        this.doc.setFontSize(12).setFont('undefined', 'regular').text(40, 70, this.g$getMyCompany.name)
        this.doc.setFontSize(12).setFont('undefined', 'normal').text(40, 90, 'Attn:')
        this.doc.setFontSize(12).setFont('undefined', 'normal').text(40, 105, this.g$getMyCompany.name)
        this.doc.setFontSize(12).setFont('undefined', 'normal').text(40, 120, this.g$getMyCompany.address)

        const companyTo = {
            name: '',
            address: '',
            phone: '',
        }

        for (let i = 0; i < this.g$listCompanyBelow.length; i++) {
            if (this.g$listCompanyBelow[i].id_company == this.g$po.order[0].order_to) {
                companyTo.name = this.g$listCompanyBelow[i].name;
                companyTo.address = this.g$listCompanyBelow[i].address;
                companyTo.phone = this.g$listCompanyBelow[i].phone;
            }
        }

        this.doc.setFontSize(14).setFont('undefined', 'bold').text(500, 40, companyTo.name);
        this.doc.setFontSize(12).setFont('undefined', 'normal').text(500, 60, companyTo.address);
        this.doc.setFontSize(12).setFont('undefined', 'normal').text(500, 90, 'Telp   : ' + companyTo.phone);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const deadline = new Date(this.g$po.deadline).toLocaleDateString("id-ID", options);
        this.doc.setFontSize(12).setFont('undefined', 'normal').text(550, 180, 'Tanggal Dikeluarkan :  ' + new Date().toLocaleDateString("id-ID", options));

        const data = []
        for (let i = 0; i < this.g$po.order.length; i++) {
            data.push([
                i + 1,
                this.g$po.order[i].order_number,
                this.g$listDataItem[i].serial_number,
                this.g$listDataItem[i].name,
                deadline,
                this.g$po.order[i].quantity,
                this.g$listDataItem[i].unit,
            ])
        }

        this.doc.autoTable({
            head: [['No', 'Nomor Order', 'Nomor Item', 'Nama Barang', 'Tanggal Deadline', 'Qty Order', 'Satuan']],
            body: data,
            startY: 200,
            theme: 'grid',
            styles: {
                fontSize: 12,
                cellPadding: 5,
                halign: 'center',
                valign: 'middle',
                hcolor: 'black',
                lineWidth: 1,
                lineColor: [0, 0, 0],
                textColor: 'black',
            },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: 'black',
                fontStyle: 'bold',
                fontSize: 12,
            },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 100 },
                2: { cellWidth: 200 },
                3: { cellWidth: 200 },
                4: { cellWidth: 100 },
                5: { cellWidth: 50 },
            },
        });

        this.doc.rect(15, 15, this.doc.internal.pageSize.width - 30, this.doc.internal.pageSize.height - 30, 'S');

        this.objectURL = URL.createObjectURL(this.doc.output('blob'));
    },
    methods: {
        ...mapActions(d$po, ['a$inquiryAddDocPO', 'a$inquiryAddPO']),
        ...mapActions(d$company, ['a$listCompanyBelow', 'a$getMyCompany']),

        nameWithLang({ name }) {
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

        async addPO() {
            try {
                let dataDoc = new FormData();
                dataDoc.append('file', this.doc.output('blob'));
                await this.a$inquiryAddDocPO(dataDoc);

                const data = {
                    po_number: this.g$po.po_number,
                    order_to: this.g$po.order_to,
                    id_doc: this.g$DocPO.id_doc,
                    order: this.g$po.order,
                    deadline: this.g$po.deadline,
                };
                await this.a$inquiryAddPO(data);
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
    },
    watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
};
</script>