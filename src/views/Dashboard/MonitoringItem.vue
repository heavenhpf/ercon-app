<template>
    <div class="div">
        <TableMonitoring />
    </div>
</template>
<script>
import Card2 from "@/examples/Cards/Card2.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "@/components/examples//Carousel.vue";
import CategoriesCard from "@/components/examples/CategoriesCard.vue";
import TableMonitoring from "@/components/examples/TableMonitoring.vue";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

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
