<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="text-start mb-1">
                <h4 class="font-weight-bolder text-dark">PO0019476</h4>
            </div>
            <div class="text-start mb-1">
                <h2 class="font-weight-bolder text-dark">Roda Mud Terain</h2>
            </div>
            <div class="mb-2">
                <p class="text-dark">Ini adalah jenis ban mobil khusus untuk full medan off road. Ban MT atau Mud Terrain ini memiliki alur dan ulir yang memang dirancang untuk medan ekstrem.</p>
            </div>
            <!-- <div>
                <div class="pb-0 row mb-4">
                    <div class="col-auto">
                        <router-link to="/monitoring/gudang-saya" tag="button">
                        <span>
                            <argon-button size="md" color="warning">
                                Kembali
                            </argon-button>
                        </span>
                    </router-link>
                    </div>
                    <div class="col-auto">
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
            </div> -->
            <div class="p-4 row mb-3">
                <div class="col-9">
                    <div class="row">
                        <div class="row mb-4">
                            <div class="col-4 me-5">
                                <div class="row">
                                    <label for="example-text-input" class="form-control-label text-sm">Produksi Saat Ini</label>
                                    <p class="p-3 card text-dark text-lg bg-gray-400">0 Kg</p>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <label for="example-text-input" class="form-control-label text-sm">Jumlah yang Dipesan</label>
                                    <p class="p-3 card text-dark text-lg bg-gray-400">500 Kg</p>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="row font-weight-bolder text-dark text-sm">Masukkan Item ke PO dari:</p>
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="radio" id="pindah-item" value="1" name="hasil-produksi">
                                    Hasil Produksi
                                </div>
                                <div class="col-md-3">
                                    <input type="radio" id="pindah-item" value="2" name="buffer">
                                    Buffer
                                </div>
                            </div>
                        </div>
                        <div class="ps-0 mb-4">
                            <label for="example-text-input" class="form-control-label text-sm">Jumlah Item yang Ditambahkan:</label>
                            <div class="col-10">
                                <argon-input type="number" isRequired="true" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-auto">
                                <router-link to="/monitoring/detail-item" tag="button">
                                    <span>
                                        <argon-button size="md" color="warning" class="me-2">
                                            Kembali
                                        </argon-button>
                                    </span>
                                </router-link>
                                <router-link to="/monitoring/detail-item" tag="button">
                                    <span>
                                        <argon-button size="md" color="primary" class="me-2">
                                            Simpan
                                        </argon-button>
                                    </span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card">
                        <div class="card-header d-flex justify-content-center">
                            <span class="badge text-dark text-lg" style="background-color: yellow;">Buffer</span>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img src="@/assets/img/illustrations/box.png" alt="warning"
                                    style="width: 80%; height: 80%;">
                            </div>
                            <h4 class="row justify-content-center">10000 Kg</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import d$dashboard from '@/stores/dashboard/dashboard';
import { mapActions, mapState } from "pinia";
import ArgonRadio from "@/components/ArgonRadio.vue";
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';

export default {
    name: "detail-item",
    components: {
        ArgonInput,
        ArgonButton,
        ArgonRadio,
    },
};
</script>
