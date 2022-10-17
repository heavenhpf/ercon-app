<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div>
                <tracking-table />
            </div>
        </div>
    </div>
</template>
<script>
import TrackingTable from "@/components/examples/TrackingTable.vue";

export default {
    name: "tracking-item",
    components: {
        TrackingTable,
    },
};
</script>