<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="text-start mb-1">
                <h4 class="font-weight-bolder text-dark">{{ g$label.d_po_detail?.d_po.po_number }}</h4>
            </div>
            <div class="text-start mb-3">
                <h2 class="font-weight-bolder text-dark">{{ g$item.name }}</h2>
            </div>
            <div class="mb-2">
                <p class="text-dark text-sm">{{ g$item.desc }}</p>
            </div>
            <div class="mb-2">
                <div class="card">
                    <div class="card-header d-flex justify-content-center">
                        <span class="badge text-dark text-lg"
                            style="background-color: yellow;">Buffer</span>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <img src="@/assets/img/illustrations/box.png" alt="warning"
                                style="width: 25%; height: 25%;">
                        </div>
                        <h5 class="d-flex justify-content-center">{{ g$item.quantity }} {{ g$item.unit }}
                        </h5>
                    </div>
                </div>
            </div>
            <div class="ps-4 row mb-3">
                <div class="col-md-9 col-lg-9 col-12">
                    <div class="row">
                        <div class="row mb-4">
                            <div class="col-md-4 col-lg-4 col-6 pe-4">
                                <div class="row">
                                    <label for="example-text-input" class="form-control-label text-sm">Input saat ini</label>
                                    <p class="p-3 card text-dark text-lg bg-gray-400">{{ g$label.d_po_detail?.quantity }}
                                        {{ g$item.unit }}</p>
                                </div>
                            </div>
                            <div class="col-md-4 col-lg-4 col-6">
                                <div class="row">
                                    <label for="example-text-input" class="form-control-label text-sm">Jumlah Pesanan</label>
                                    <p class="p-3 card text-dark text-lg bg-gray-400">
                                        {{ g$label.d_po_detail?.d_order.quantity }} {{ g$item.unit }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="row font-weight-bolder text-dark text-sm mb-2">Masukkan Item ke PO dari:</p>
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="radio" v-model="input.is_buffer" v-bind:value="false">
                                    Hasil Produksi
                                </div>
                                <div class="col-md-3">
                                    <input type="radio" v-model="input.is_buffer" v-bind:value="true">
                                    Buffer
                                </div>
                            </div>
                        </div>
                        <div class="ps-0 mb-4">
                            <label for="example-text-input" class="form-control-label text-sm">Jumlah Item yang
                                Ditambahkan:</label>
                            <div class="col-10">
                                <argon-input v-model.number="input.quantity" type="number" isRequired="true" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-auto">
                                <span>
                                    <argon-button @click="addItemQuantity()" size="md" color="primary" class="me-2">
                                        Simpan
                                    </argon-button>
                                </span>
                                <router-link
                                    :to="{ name: 'Pesanan Masuk Detail', params: { id: this.$route.params.id_po } }"
                                    tag="button">
                                    <span>
                                        <argon-button size="md" color="warning" class="me-2">
                                            Kembali
                                        </argon-button>
                                    </span>
                                </router-link>
                            </div>
                            <div id="liveToast"
                                class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-success"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        Pesanan Berhasil Diupdate!
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                            <div id="liveToastError"
                                class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-danger"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        Gagal Menambahkan Jumlah Item Pesanan!
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3 d-none d-md-block d-lg-block">
                    <div class="card">
                        <div class="card-header d-flex justify-content-center">
                            <span class="badge text-dark text-lg" style="background-color: yellow;">Buffer</span>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img src="@/assets/img/illustrations/box.png" alt="warning"
                                    style="width: 80%; height: 80%;">
                            </div>
                            <h4 class="row justify-content-center">{{ g$item.quantity }} {{ g$item.unit }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import d$item from '@/stores/dashboard/item';
import { mapActions, mapState } from "pinia";
import ArgonRadio from "@/components/ArgonRadio.vue";
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';

export default {
    name: "detail-item",
    data: () => ({
        input: {
        }
    }),
    components: {
        ArgonInput,
        ArgonButton,
        ArgonRadio,
    },
    computed: {
        ...mapState(d$item, ['g$item', 'g$label']),
    },
    methods: {
        ...mapActions(d$item, ['a$itemDetail', 'a$editItemQuantity']),

        async addItemQuantity() {
            try {
                const { is_buffer, quantity } = this.input;
                const data = {
                    is_buffer,
                    quantity,
                };
                await this.a$editItemQuantity(this.g$label.id_item_detail, data);
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                    this.$router.push({ name: 'Pesanan Masuk Detail', params: { id: this.$route.params.id_po } });
                }, 1000);
            } catch (error) {
                console.error(error);
                const toastLiveExample = document.getElementById('liveToastError');
                const toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
            }
        }
    },
    async mounted() {
        try {
            await this.a$itemDetail({ id: this.$route.params.id_item_detail });
            console.log(this.$route.params.id_item)
        } catch (e) {
        }
    }
};
</script>
