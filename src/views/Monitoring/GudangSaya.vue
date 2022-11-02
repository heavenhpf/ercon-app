<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="p-4 col-lg-12 mb-3">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-4 col-md-6 col-12 me-7">
                        <card2 :title="stats.item.title" :value="stats.item.value"
                            :cardBackground="stats.item.cardBackground">
                        </card2>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <card2 :title="stats.po.title" :value="stats.po.value"
                            :cardBackground="stats.po.cardBackground">
                        </card2>
                    </div>
                </div>
            </div>
            <div>
                <div class="pb-0 row mb-lg-3 mb-2 col-3">
                    <router-link to="/monitoring/tambah-item" tag="button">
                        <span>
                            <argon-button size="md me-2" color="primary">
                                <span class="fa fa-plus fa-sm me-2" />
                                Tambah Item
                            </argon-button>
                        </span>
                    </router-link>
                </div>
            </div>
            <div>
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
    name: "gudang-saya",
    data() {
        return {
            stats: {
                item: {
                    title: "Total Jenis Item",
                    value: "60",
                    cardBackground: "bg-primary",
                },
                po: {
                    title: "PO yang Belum Selesai",
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
