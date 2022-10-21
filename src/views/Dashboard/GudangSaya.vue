<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="p-4 col-lg-12 mb-3">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-4 col-md-6 col-12">
                        <card2 :title="stats.po.title" :value="stats.po.value"
                            :cardBackground="stats.po.cardBackground">
                        </card2>
                    </div>
                    <div class="col-lg-1">
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <card2 :title="stats.buffer.title" :value="stats.buffer.value"
                            :cardBackground="stats.buffer.cardBackground">
                        </card2>
                    </div>
                </div>
            </div>
            <div class="pb-0 row mb-lg-3 mb-2">
                <router-link to="/dashboard/tambah-item" tag="button">
                    <span>
                        <argon-button size="md me-2" color="primary">
                            <span class="fa fa-plus fa-sm me-2" />
                            Tambah Item
                        </argon-button>
                    </span>
                </router-link>
            </div>
            <div>
                <monitoring-table />
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
    name: "gudang-saya",
    data() {
        return {
            stats: {
                po: {
                    title: "Barang Purchasing Order",
                    value: "60",
                    cardBackground: "bg-primary",
                },
                buffer: {
                    title: "Buffer",
                    value: "120",
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
        TrackingTable,
    },
};
</script>