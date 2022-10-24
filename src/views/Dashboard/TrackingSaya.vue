<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="p-4 col-lg-12 mb-3">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <card2 :title="stats.belum.title" :value="stats.belum.value"
                            :cardBackground="stats.belum.cardBackground">
                        </card2>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <card2 :title="stats.lewat.title" :value="stats.lewat.value"
                            :cardBackground="stats.lewat.cardBackground">
                        </card2>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <card2 :title="stats.selesai.title" :value="stats.selesai.value"
                            :cardBackground="stats.selesai.cardBackground"></card2>
                    </div>
                </div>
            </div>
            <div>
                <tracking-table />
            </div>
        </div>
    </div>
</template>

<script>
import Card2 from "@/examples/Cards/Card2.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "@/components/examples//Carousel.vue";
import CategoriesCard from "@/components/examples/CategoriesCard.vue";
import TrackingTable from "@/components/examples/TrackingTable.vue";

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
                    cardBackground: "bg-danger",
                },
                selesai: {
                    title: "Selesai",
                    value: "20",
                    cardBackground: "bg-success",
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
        TrackingTable,
    },
};
</script>