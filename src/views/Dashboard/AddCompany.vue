<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="pb-0 text-start mb-3">
                        <h4 class="font-weight-bolder text-dark">Tambah Company</h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Username</label>
                                <argon-input type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Password</label>
                                <argon-input type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nama
                                    Perusahaan</label>
                                <argon-input type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm mb-2">Tingkat Perusahaan</label>
                                <div class="row p-2">
                                    <div class="col-md-2">
                                        <argon-radio id="tier" name="tier" checked>Tier 1</argon-radio>
                                    </div>
                                    <div class="col-md-2">
                                        <argon-radio id="tier" name="tier">Tier 2</argon-radio>
                                    </div>
                                    <div class="col-md-2">
                                        <argon-radio id="tier" name="tier">Tier 3</argon-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Alamat</label>
                                    <argon-input type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nomor Telepon</label>
                                    <argon-input type="text" />
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9">
                            <router-link to="/dashboard/company" tag="button">
                                <span>
                                    <argon-button size="md" color="primary">
                                        Tambah
                                    </argon-button>
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';
import ArgonRadio from "@/components/ArgonRadio.vue";

export default {
    name: 'add-company',
    components: {
        ArgonInput,
        ArgonButton,
        ArgonRadio,
    },
};
</script>