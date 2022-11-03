<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start mb-3">
                <h4 class="font-weight-bolder text-dark">Monitoring Item</h4>
            </div>
            <div class="div">
                <TableMonitoring />
            </div>
        </div>
    </div>
</template>
<script>
import Card2 from "@/examples/Cards/Card2.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "@/components/examples//Carousel.vue";
import CategoriesCard from "@/components/examples/CategoriesCard.vue";
import TableMonitoring from "@/components/examples/TableMonitoring.vue";

export default {
    name: "tracking-saya",
    data() {
        return {
            stats: {
                belum: {
                    title: "Belum Deadline",
                    value: "60",
                    cardBackground: "bg-primary",
                },
                lewat: {
                    title: "Lewat Deadline",
                    value: "20",
                    cardBackground: "bg-warning",
                },
            },
            data: [],
        };
    },
    components: {
        Card2,
        GradientLineChart,
        Carousel,
        CategoriesCard,
        TableMonitoring,
    },
};
</script>
