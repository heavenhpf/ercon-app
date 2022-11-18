<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                 <div class="pb-0 text-start mb-4">
                    <h4 class="font-weight-bolder text-dark">Pilih Order</h4>
                </div>
                <div class="row mb-4">
                    <div class="col-4">
                        <label>Filter Berdasarkan Company</label>
                        <select
                            class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                            <option> PT Sugiti Indonesia </option>
                            <option v-for='items in g$listCategory' v-bind:value="items.id_category">{{ items.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-8 mt-4 d-flex flex-row-reverse bd-highlight">
                        <router-link class="nav-link" to="/po/ajukan-po-2">
                            <argon-button color="primary">
                                Selanjutnya
                            </argon-button>
                        </router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-2">
                        <p class="text-sm mb-0">(Centang order yang Anda pilih)</p>
                    </div>
                    <div class="col-11">
                        <div class="card">
                            <div class="card-header p-3 pb-0">
                                <div class="row">
                                    <div class="col-6">
                                        <p class="text-dark text-sm mb-0">Nomor Order</p>
                                        <h5 class="text-dark">ORDER0015</h5>
                                    </div>
                                    <div class="col-6 d-flex flex-row-reverse bd-highlight">
                                        <p class="text-dark text-sm mb-0">18 November 2022</p>
                                    </div>
                                </div>
                                <hr class="w-100 d-flex justify-content-center mt-1 mb-2">
                            </div>
                            <div class="card-body p-3 pt-0 pb-0">
                                <div class="row">
                                    <div class="col-9">
                                        <h6 class="text-dark mb-0">Roda Eco Tire</h6>
                                        <p class="text-dark"><b>1000</b> Unit</p>
                                    </div>
                                    <div class="col-3 mt-3">
                                        <argon-button color="primary" class="me-3">
                                            Edit
                                        </argon-button>
                                        <argon-button color="danger" size="md">
                                            Hapus
                                        </argon-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-1 mt-6">
                        <argon-checkbox id="checkboxId"></argon-checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";

export default {
    name: "ajukan-po-1",
    data() {
        return {
        };
    },
    components: {
        ArgonCheckbox,
    },
};
</script>