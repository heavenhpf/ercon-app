<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start mb-3">
                <h4 class="font-weight-bolder text-dark">Pesanan Masuk</h4>
            </div>
            <div>
                <PesananMasukTable />
            </div>
        </div>
    </div>
</template>
<script>
import PesananMasukTable from "@/components/examples/PesananMasukTable.vue";

export default {
    name: "pesanan-masuk",
    components: {
        PesananMasukTable,
    },
};
</script>