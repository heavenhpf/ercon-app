<template>
    <div class="py-4 container-fluid">
        <div class="row">
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
