<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start">
                <h4 class="font-weight-bolder text-dark">Gudang Saya</h4>
            </div>
            <div class="p-4 mb-4">
                <div class="row">
                    <div class="d-flex justify-content-center">
                        <card2 :title="stats.jenisItem.title" :value="g$countItem.item"
                            :cardBackground="stats.jenisItem.cardBackground" :iconClass="stats.jenisItem.iconClass"
                            :textPosition="stats.jenisItem.textPosition" :iconPosition="stats.jenisItem.iconPosition">
                        </card2>
                    </div>
                </div>
            </div>
            <div>
                <div class="pb-0 col-auto mb-2">
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
                <gudang-saya-table />
            </div>
        </div>
    </div>
</template>

<script>
import Card2 from "@/examples/Cards/Card2.vue";
import d$dashboard from '@/stores/dashboard/dashboard';
import { mapActions, mapState } from "pinia";
import GudangSayaTable from "@/components/tables/GudangSayaTable.vue";

export default {
    name: "gudang-saya",
    data() {
        return {
            stats: {
                jenisItem: {
                    title: "Total Jenis Item",
                    cardBackground: "bg-primary col-lg-6 col-md-8 col-12",
                    iconClass: "fa-5x opacity-9 fa fa-archive",
                    textPosition: "p-4 ps-5 col-lg-9 col-md-8 col-7",
                    iconPosition: "p-2 col-lg-3 float-end col-md-4 col-5",
                },
            },
            data: [],
        };
    },
    components: {
        Card2,
        GudangSayaTable,
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