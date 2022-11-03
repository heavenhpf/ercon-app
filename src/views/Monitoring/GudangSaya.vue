<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="p-4 col-lg-12 mb-3">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-8 col-md-8 col-12">
                        <card3 :title="stats.jenisItem.title" :value="g$countItem.item"
                            :cardBackground="stats.jenisItem.cardBackground" :iconClass="stats.jenisItem.iconClass">
                        </card3>
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
import Card3 from "@/examples/Cards/Card3.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "@/components/examples//Carousel.vue";
import CategoriesCard from "@/components/examples/CategoriesCard.vue";
import TableMonitoring from "@/components/examples/TableMonitoring.vue";
import d$dashboard from '@/stores/dashboard/dashboard';
import { mapActions, mapState } from "pinia";

export default {
    name: "gudang-saya",
    data() {
        return {
            stats: {
                jenisItem: {
                    title: "Total Jenis Item",
                    // value: "= 60 jenis",
                    cardBackground: "bg-primary",
                    iconClass: "fa fa-window-restore",
                },
            },
            data: [],
        };
    },
    components: {
        Card3,
        GradientLineChart,
        Carousel,
        CategoriesCard,
        TableMonitoring,
    },
    computed: {
        ...mapState(d$dashboard, ['g$countItem']),
    },
    methods: {
        ...mapActions(d$dashboard, ['a$countItem']),
    },
    async mounted() {
        try {
            await this.a$countItem();
        } catch (e) {
        }
    }
};
</script>