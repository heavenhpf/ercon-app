<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start mb-3">
                <h4 class="font-weight-bolder text-dark">Tracking Tier Bawah</h4>
            </div>
            <div>
                <tracking-tier-bawah-table />
            </div>
        </div>
    </div>
</template>

<script>
import TrackingTierBawahTable from "@/components/tables/TrackingTierBawahTable.vue";

export default {
    name: "tracking-tier-bawah",
    components: {
        TrackingTierBawahTable,
    },
};
</script>