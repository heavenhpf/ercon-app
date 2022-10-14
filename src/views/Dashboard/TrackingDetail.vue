<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <h5 class="text-dark">Nomor PO:</h5>
                    <div class="col-8 pb-0 text-start mb-3">
                        <h4 class="font-weight-bolder text-dark">1213</h4>
                    </div>
                    <div class="col-4">
                        <h5 class="font-weight-bolder text-danger float-end">Deadline 30 September 2022</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 pb-0 mb-3">
                        <h5 class="font-weight-bolder text-dark">{{ g$name.name }}</h5>
                        <h6 class="text-dark">Progress</h6>
                        <div class="row ps-2">
                            <div class="col progress" style="height: 20px;">
                                <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="60"
                                    aria-valuemin="0" aria-valuemax="100" style="width: 60%; height: 20px;"></div>
                            </div>
                            <span class="col text-xs">60%</span>
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
import { baseApi } from '@/utils/axios';
import d$po from '@/stores/dashboard/po';
import { mapActions, mapState } from "pinia";
import d$company from "../../stores/dashboard/company";

export default {
    name: "tracking-detail",
    data() {
        return {
            posts: '',
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
            const { data } = await baseApi.get(`/companies/name`);
            // const { data2 } = await baseApi.get(`/detail/:id`);
            this.posts = data.name;
            this.posts = data2.po.id_po;
        } catch (e) {
            console.error(e);
        }
    },

    computed: {
        // ...mapState(d$po, ['g$po', 'g$list_po_detail']),
        ...mapState(d$company, ['g$name']),


    },
    methods: {
        // ...mapActions(d$po, ['a$listPoDetail']),
        ...mapActions(d$company, ['a$name'])
    },
    async mounted() {
        try {
            // await this.a$listPoDetail(this.filter);
            await this.a$name();
        } catch (e) {
        }
    }
};
</script>
