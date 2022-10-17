<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <h5 class="text-dark">Nomor PO:</h5>
                    <div class="col-8 pb-0 text-start mb-5 p-3">
                        <h4 class="font-weight-bolder text-dark">{{ g$po.po_number }}</h4>
                    </div>
                    <div class="col-4">
                        <h6 class="font-weight-bolder text-danger float-end p-3">Deadline: 30 September 2022</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 pb-0 mb-3">
                        <h5 class="font-weight-bolder text-dark">{{ g$po.s_company_d_po_order_toTos_company?.name }}</h5>
                        <h6 class="text-dark">Progress</h6>
                            <div class="progress" style="height: 20px; width: 70%;">
                                <div class="progress-bar bg-success" role="progressbar" :style="{width: g$po.progress * 100 + '%'}" aria-valuenow="{{g$po.progress * 100}}" aria-valuemin="0" aria-valuemax="100">{{ g$po.progress * 100 }}%</div>
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
                    <div class="col-2 pb-0 mb-3">
                        <h6 class="text-dark text-sm">Delivery Note:</h6>
                        <span>
                            <argon-button size="md me-2" color="success">
                                <span class="ni ni-single-copy-04 fa-lg me-2" />
                                Lihat PDF
                            </argon-button>
                        </span>
                    </div>
                </div>
                <div>
                    <POTable />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import POTable from "@/components/examples/POTable.vue";
import d$po from '@/stores/dashboard/po';
import { mapActions, mapState } from "pinia";

export default {
    name: "tracking-detail",
    data() {
        return {
            post: {},
            po_detail: [],
            errors: [],
        }
    },
    components: {
        ArgonButton,
        POTable,
    },
    filter: {
        id_po: 1,
    },


    async created() {
        try {
        } catch (e) {

        }
    },

    computed: {
        ...mapState(d$po, ['g$po']),


    },
    methods: {
    },
    async mounted() {
        try {
        } catch (e) {
        }
    }
};
</script>