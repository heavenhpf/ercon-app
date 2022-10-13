<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <h5 class="text-dark">Nomor PO:</h5>
                    <div class="col-8 pb-0 text-start mb-3">
                        <h4 class="font-weight-bolder text-dark">PO0019476</h4>
                    </div>
                    <div class="col-4">
                        <h6 class="font-weight-bolder text-danger float-end">Deadline 30 September 2022</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10 pb-0 mb-3">
                        <h5 class="font-weight-bolder text-dark">PT Toyota Manufacturing</h5>
                        <h6 class="text-dark">Progress</h6>
                        <div class="row ps-2">
                            <div class="col progress" style="height: 20px;">
                                <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="60"
                                    aria-valuemin="0" aria-valuemax="100" style="width: 60%; height: 20px;"></div>
                            </div>
                            <span class="col text-xs font-weight-bold">60%</span>
                        </div>
                    </div>
                    <div class="col-2 pb-0 mb-3">
                        <h6 class="text-dark">File Berkas PO:</h6>
                        <span>
                            <argon-button size="md me-2" color="primary">
                                <span class="ni ni-single-copy-04 fa-lg me-2" />
                                View PDF
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
export default {
    name: "tracking-detail",
    components: {
        ArgonButton,
        POTable,
    },
};
</script>