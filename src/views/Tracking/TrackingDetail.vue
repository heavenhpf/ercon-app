<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <h5 class="text-dark">Nomor PO:</h5>
                    <div class="col-8 pb-0 mb-3">
                        <h4 class="font-weight-bolder text-dark">{{ g$po.po_number }}</h4>
                    </div>
                    <div class="col-4">
                        <p class="font-weight-bolder text-danger float-end">Deadline: {{ new
                                Date(g$po.deadline).toLocaleDateString("id-ID", {
                                    weekday: 'long', year: 'numeric', month:
                                        'long', day: 'numeric'
                                })
                        }}</p>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-8 pb-0 mb-3">
                        <h5 class="font-weight-bolder text-dark">{{ g$po.s_company_d_po_order_toTos_company?.name }}
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
                            <argon-button @click="triggerClickPO()" size="md me-2" color="primary">
                                <span class="ni ni-single-copy-04 fa-lg me-2" />
                                Lihat PDF
                            </argon-button>
                        </span>
                    </div>
                    <modal-comp size="lg" v-model:show="modal.preview">
                        <template #header>
                            <h3 class="modal-title">Preview Purchasing Order</h3>
                        </template>
                        <template v-if="modal.add" #body>
                            <div class="row">
                                <div class="col-12">
                                    <iframe ref="DownloadComp" id="preview" style="width:100%; height: 400px;"
                                        :src="objectURL"></iframe>
                                </div>
                            </div>
                        </template>
                    </modal-comp>
                    <div class="col-2 pb-0 mb-3">
                        <h6 class="text-dark text-sm">Delivery Note:</h6>
                        <span>
                            <argon-button @click="triggerClickDN()" size="md me-2" color="success">
                                <span class="ni ni-single-copy-04 fa-lg me-2" />
                                Lihat PDF
                            </argon-button>
                        </span>
                    </div>
                    <modal-comp size="lg" v-model:show="modal.preview">
                        <template #header>
                            <h3 class="modal-title">Preview Delivery Note</h3>
                        </template>
                        <template v-if="modal.add" #body>
                            <div class="row">
                                <div class="col-12">
                                    <iframe ref="DownloadComp" id="preview" style="width:100%; height: 400px;"
                                        :src="objectURL"></iframe>
                                </div>
                            </div>
                        </template>
                    </modal-comp>
                </div>
                <!-- <iframe ref="DownloadComp" id="preview" hidden style="width:100%; height: 400px;" :src="objectURL"></iframe> -->
                <div>
                    <POTable />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import POTable from "@/components/tables/POTable.vue";
import d$po from '@/stores/dashboard/po';
import d$doc from '@/stores/dashboard/doc';
import { mapActions, mapState } from "pinia";



export default {
    name: "tracking-detail",
    data() {
        return {
            post: {},
            po_detail: [],
            errors: [],
            modal: {
                preview: false,
            },
            objectURL: null,
        }
    },
    components: {
        ArgonButton,
        POTable,
    },


    async created() {
        try {
        } catch (e) {

        }
    },

    computed: {
        ...mapState(d$po, ['g$po']),
        ...mapState(d$doc, ['g$getDoc']),
    },
    methods: {
        ...mapActions(d$po, ['a$listPoDetail']),
        ...mapActions(d$doc, ['a$getDoc']),

        async triggerClickPO() {
            // if (this.objectURL) {
            //     URL.revokeObjectURL(this.objectURL);
            // }
            const value = Number(this.g$po.id_doc);
            const obj = {
                id_doc: value,
            }
            await this.a$getDoc(obj);
            const blob = new Blob([this.g$getDoc], { type: 'application/pdf' });
            console.log(blob);
            this.objectURL = URL.createObjectURL(blob);
            window.open(this.objectURL);

        },
        async triggerClickDN() {
            // if (this.objectURL) {
            //     URL.revokeObjectURL(this.objectURL);
            // }
            const value = Number(this.g$po.d_dn[0].id_doc);
            const obj = {
                id_doc: value,
            }
            await this.a$getDoc(obj);
            const blob = new Blob([this.g$getDoc], { type: 'application/pdf' });
            console.log(blob);
            this.objectURL = URL.createObjectURL(blob);
            window.open(this.objectURL);

        },
    },
    async mounted() {
        try {
        } catch (e) {
        }
    }
};
</script>