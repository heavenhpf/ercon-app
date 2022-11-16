<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="pb-0 text-start mb-4">
                <h4 class="font-weight-bolder text-dark">Edit Jumlah Buffer</h4>
            </div>
            <div class="row mb-3">
                <div class="col-9">
                    <div class="mb-2">
                        <p class="font-weight-bolder text-dark">Masukkan jumlah buffer terkini:</p>
                    </div>
                    <div class="mb-3 col-9">
                        <!-- <argon-input v-model="input.username" type="text" required/> -->
                        <argon-input type="number" isRequired="true" />
                    </div>
                    <router-link to="/monitoring/detail-item" tag="button">
                        <span>
                            <argon-button size="md" color="primary" class="me-2">
                                Simpan Perubahan
                            </argon-button>
                        </span>
                    </router-link>
                    <router-link to="/monitoring/detail-item" tag="button">
                        <span>
                            <argon-button size="md" color="warning" class="me-2">
                                Kembali
                            </argon-button>
                        </span>
                    </router-link>
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
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';

export default {
    name: "edit-jumlah-buffer",
    components: {
        ArgonInput,
        ArgonButton,
    },
};
</script>
