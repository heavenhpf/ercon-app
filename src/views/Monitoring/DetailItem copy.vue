<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="card mb-5 col-9">
                <div class="card-header p-3 pb-0">
                    <div class="text-start">
                        <div class="row">
                            <div class="col-9 p-1">
                                <h3 class="font-weight-bolder text-dark">Roda Mud Terain</h3>
                            </div>
                            <div class="col-3 p-1 ps-6">
                                <router-link to="/monitoring/edit-jumlah-buffer" tag="button">
                                    <span>
                                        <argon-button size="md" color="primary">
                                            <span class="fa fa-pencil-square-o fa-md me-2" />
                                            Edit
                                        </argon-button>
                                    </span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body p-3 pb-0">
                    <p class="text-dark" style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;">
                        Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud
                        Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.
                        Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud
                        Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.
                        Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud
                        Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.
                        Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud
                        Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.
                        Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud
                        Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.
                        Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud
                        Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.
                    </p>
                </div>
                <!-- <div class="card-footer col-auto p-3 pt-1">
                    <router-link to="/monitoring/edit-jumlah-buffer" tag="button">
                        <span>
                            <argon-button size="md" color="primary">
                                <span class="fa fa-pencil-square-o fa-md me-2" />
                                Edit
                            </argon-button>
                        </span>
                    </router-link>
                </div> -->
            </div>
            <div class="mb-5 col-3">
                <div class="card">
                    <div class="card-header p-4 d-flex justify-content-center">
                        <span class="badge text-dark text-lg" style="background-color: yellow;">Buffer</span>
                    </div>
                    <div class="row card-body pt-2">
                        <div class="col-6 pe-0">
                            <div class="d-flex justify-content-center">
                                <img src="@/assets/img/illustrations/box.png" alt="warning"
                                    style="width: 100%; height: 100%;">
                            </div>
                        </div>
                        <div class="col-6 pt-2">
                            <h5 class="row justify-content-center font-weight-bolder">10000</h5>
                            <h6 class="row justify-content-center">Kg</h6>
                        </div>
                        <div class="p-4 mb-0 col-12 d-flex justify-content-center">
                            <router-link to="/monitoring/edit-jumlah-buffer" tag="button">
                                <span>
                                    <argon-button size="sm" color="primary">
                                        <span class="fa fa-pencil-square-o fa-md me-2" />
                                        Edit
                                    </argon-button>
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <h5 class="font-weight-bolder">Pesanan Item yang Masuk</h5>
            <div class="mb-3 p-2">
                <ItemTable />
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
