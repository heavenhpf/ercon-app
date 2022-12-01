<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <h5 class="text-dark">Nomor PO:</h5>
                    <div class="col-8 pb-0 mb-3">
                        <h4 class="font-weight-bolder text-dark">{{ g$po?.po_number }}</h4>
                    </div>
                    <div class="col-4">
                        <p class="font-weight-bolder text-danger float-end">Deadline: {{ new
                                Date(g$po?.deadline).toLocaleDateString("id-ID", {
                                    weekday: 'long', year: 'numeric', month:
                                        'long', day: 'numeric'
                                })
                        }}</p>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-10 pb-0 mb-3">
                        <h5 class="font-weight-bolder text-dark">{{ g$po.s_company_d_po_order_fromTos_company?.name }}
                        </h5>
                        <h6 class="text-dark">Progress</h6>
                        <div class="progress" style="height: 20px; width: 70%;">
                            <div class="progress-bar bg-success" role="progressbar"
                                :style="{ width: g$po.progress * 100 + '%' }" aria-valuenow="{{g$po.progress * 100}}"
                                aria-valuemin="0" aria-valuemax="100">{{ (g$po.progress * 100).toFixed(1) }}%
                            </div>
                        </div>
                    </div>
                    <div class="col-2 pb-0 mb-3">
                        <h6 class="text-dark text-sm">Purchasing Order:</h6>
                        <span>
                            <argon-button size="md me-2" color="primary">
                                <span class="ni ni-single-copy-04 fa-lg me-2" />
                                Lihat PDF
                            </argon-button>
                        </span>
                    </div>
                </div>
                <div class="pb-0 col-auto mb-lg-3 mb-2 col-3">
                    <argon-button id="hidden" size="md me-2" color="primary" hidden @click="triggerAddDN()">
                        <span class="fa fa-pencil-square-o fa-md me-2" />
                        Buat Delivery Note
                    </argon-button>
                </div>

                <modal-comp size="lg" v-model:show="modal.addDN">
                    <template #header>
                        <div class="row">
                            <h4 class="modal-title font-weight-bolder">Buat Delivery Note</h4>
                        </div>
                    </template>
                    <template v-if="modal.addDN" #body>
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-4">
                                    <label class="form-control-label text-sm">Nomor PO</label>
                                    <input class="form-control" type="text" v-model="g$po.po_number" readonly>
                                </div>
                                <div>
                                    <label class="form-control-label text-sm">Dokumen Delivery Note</label>
                                    <argon-input type="file" id="file" v-model="input.file"
                                        @change="submitFile($event)" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #footer>
                        <span>
                            <argon-button @click="addDN()" size="md" color="primary" class="me-2">
                                Simpan Perubahan
                            </argon-button>
                        </span>
                        <span>
                            <argon-button @click="toggleBack()" size="md" color="warning" class="me-2">
                                Kembali
                            </argon-button>
                        </span>
                    </template>
                </modal-comp>

                <div class="mb-3">
                    <PesananMasukDetailTable />
                </div>
                <div class="col-lg-8 col-md-9">
                    <router-link to="/tracking/pesanan-masuk" tag="button">
                        <span>
                            <argon-button size="md" color="warning" class="me-2">
                                Kembali
                            </argon-button>
                        </span>
                    </router-link>
                </div>
                <div id="liveToast"
                    class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            Delivery Note Berhasil diupdate
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import d$po from '@/stores/dashboard/po';
import d$dn from '@/stores/dashboard/dn';
import { mapActions, mapState } from "pinia";
import PesananMasukDetailTable from "@/components/tables/PesananMasukDetailTable.vue";

export default {
    name: "pesanan-masuk-detail",
    data: () => ({
        input: {
        },
        modal: {
            addDN: false,
        },
        file: null,
        fileData: null,
    }),
    components: {
        ArgonButton,
        PesananMasukDetailTable,
    },
    async created() {
        try {
        } catch (e) {

        }
    },
    computed: {
        ...mapState(d$po, ['g$po']),
        ...mapState(d$dn, ['g$DocDN']),
    },
    mounted() {
        let element = document.getElementById('hidden')
        setTimeout(() => {
            if (this.g$po.progress === 1 && this.g$po.finished_at === null) {
                // element.setAttribute("hidden", "hidden");
                element.removeAttribute("hidden")
            }
        }, 500);
    },
    methods: {
        ...mapActions(d$dn, ['a$addDN', 'a$addDocDN']),

        async submitFile(event) {
            this.file = event.target.files[0]
            this.fileData = new FormData();
            this.fileData.append('file', this.file);
        },

        async triggerAddDN() {
            try {
                this.modal.addDN = true;
            } catch (error) {
                throw error
            }
        },
        async addDN() {
            try {
                await this.a$addDocDN(data);
                const data = {
                    id_po: Number(this.g$po.id_po),
                    id_doc: Number(this.g$DocDN.id_doc)
                }
                await this.a$addDN(data)
                this.modal.addDN = false;
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                }, 1000);
            } catch (error) {
                throw error
            }
        },
        async toggleBack() {
            try {
                this.modal.addDN = false;
            } catch (error) {
                throw error;
            }
        },
    },
};
</script>