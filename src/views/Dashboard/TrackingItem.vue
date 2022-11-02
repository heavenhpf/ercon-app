<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div>
                <TrackingTable />
            </div>
        </div>
    </div>
</template>
<script>
import TrackingTable from "@/components/examples/TrackingTable.vue";

export default {
    name: "tracking-saya",
    components: {
        TrackingTable,
    },
};
</script>
