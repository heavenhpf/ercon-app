<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="text-start mb-1">
                <h2 class="font-weight-bolder text-dark">Roda Mud Terain</h2>
            </div>
            <div class="mb-4">
                <p class="text-dark">Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.</p>
            </div>
            <div>
                <div class="pb-0 col-auto mb-lg-3 mb-2 col-3">
                    <router-link to="/monitoring/edit-jumlah-buffer" tag="button">
                        <span>
                            <argon-button size="md me-2" color="primary">
                                <span class="fa fa-pencil-square-o fa-md me-2" />
                                Edit Jumlah Buffer
                            </argon-button>
                        </span>
                    </router-link>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-9">
                    <ItemTable />
                </div>
                <div class="col-3">
                    <div class="card">
                        <div class="card-header d-flex justify-content-center">
                            <span class="badge text-dark text-lg" style="background-color: yellow;">Buffer</span>
                        </div>
                        <div class="card-body">
                            <div class="align-items-center">
                                <div class="d-flex justify-content-center">
                                    <img src="@/assets/img/illustrations/box.png" alt="warning"
                                        style="width: 80%; height: 80%;">
                                </div>
                                <div class="mt-2 mb-2">
                                    <h4 class="row justify-content-center">10000 Kg</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link to="/monitoring/gudang-saya" tag="button">
                <span>
                    <argon-button size="md" color="warning" class="me-2">
                        Kembali
                    </argon-button>
                </span>
            </router-link>
        </div>
    </div>
</template>

<script>
import d$dashboard from '@/stores/dashboard/dashboard';
import { mapActions, mapState } from "pinia";
import ItemTable from "@/components/examples/ItemTable.vue";
import ArgonButton from '@/components/ArgonButton.vue';

export default {
    name: "detail-item",
    components: {
        ItemTable,
        ArgonButton,
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
