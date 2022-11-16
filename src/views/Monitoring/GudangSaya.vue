<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start">
                <h4 class="font-weight-bolder text-dark">Gudang Saya</h4>
            </div>
            <div class="p-4 col-lg-12 mb-3">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-8 col-md-8 col-12">
                        <card2 :title="stats.jenisItem.title" :value="g$countItem.item"
                            :cardBackground="stats.jenisItem.cardBackground" :iconClass="stats.jenisItem.iconClass"
                            :textPosition="stats.jenisItem.textPosition" :iconPosition="stats.jenisItem.iconPosition">
                        </card2>
                    </div>
                </div>
            </div>
            <div>
                <div class="pb-0 col-auto mb-lg-3 mb-2 col-3">
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
import GudangSayaTable from "@/components/examples/GudangSayaTable.vue";

export default {
    name: "gudang-saya",
    data() {
        return {
            stats: {
                jenisItem: {
                    title: "Total Jenis Item",
                    cardBackground: "bg-primary",
                    iconClass: "fa-6x opacity-9 fa fa-archive",
                    textPosition: "p-4 ps-5 col-9",
                    iconPosition: "p-1 col-3",
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
