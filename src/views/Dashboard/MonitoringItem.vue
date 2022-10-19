<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start mb-3">
                <h4 class="font-weight-bolder text-dark">List Barang</h4>
            </div>
            <div>
                <monitoring-table />
            </div>
        </div>
    </div>
</template>
<script>
import MonitoringTable from "@/components/examples/MonitoringTable.vue";

export default {
    name: "monitoring-item",
    components: {
        MonitoringTable,
    },
};
</script>