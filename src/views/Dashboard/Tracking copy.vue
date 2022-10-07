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
            <div class="pb-0 row mb-lg-3 mb-2">
                <div class="col-lg-4 col-md-4">
                    <select class="form-select" id="inputGroupSelect01">
                        <option selected>Sortir Berdasarkan Timeline</option>
                        <option value="1">Belum Deadline</option>
                        <option value="2">Melewati Deadline</option>
                        <option value="3">Progress Selesai</option>
                        <option value="3">Progress Selesai</option>
                    </select>
                </div>
                <div class="col-lg-2 col-md-4 me-6">
                    <select class="form-select" id="inputGroupSelect01">
                        <option selected>Pilih Tier</option>
                        <option value="1">Tier 1</option>
                        <option value="2">Tier 2</option>
                        <option value="3">Tier 3</option>
                    </select>
                </div>
                <div class="col-lg-5 col-md-6 align-items-end">
                    <span>
                        <div class="input-group">
                            <span class="input-group-text text-body">
                                <i class="fas fa-search" aria-hidden="true"></i>
                            </span>
                            <input type="text" class="form-control" :placeholder="
                            'Cari..'
                            " />
                        </div>
                    </span>
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

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

export default {
    name: "tracking",
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
            sales: {
                us: {
                    country: "United States",
                    sales: 2500,
                    value: "$230,900",
                    bounce: "29.9%",
                    flag: US,
                },
                germany: {
                    country: "Germany",
                    sales: "3.900",
                    value: "$440,000",
                    bounce: "40.22%",
                    flag: DE,
                },
                britain: {
                    country: "Great Britain",
                    sales: "1.400",
                    value: "$190,700",
                    bounce: "23.44%",
                    flag: GB,
                },
                brasil: {
                    country: "Brasil",
                    sales: "562",
                    value: "$143,960",
                    bounce: "32.14%",
                    flag: BR,
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