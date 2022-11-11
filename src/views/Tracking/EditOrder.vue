<template>
    <div class="container mt-3 pe-5">
        <div class="card">
            <div class="card-body p-4">
                <div class="row p-1">
                <h6 class="text-dark">Nomor Item</h6>
                <div class="col-8 pb-0">
                    <h4 class="font-weight-bolder text-dark">R-23123</h4>
                </div>
                <div class="col-4">
                    <p class="font-weight-bolder text-danger float-end">Deadline: 20 September 2022</p>
                </div>
            </div>
            <hr>
            <div class="p-1">
                <h4 class="font-weight-bolder text-dark">Roda Eco Tire</h4>
                <p class="text-dark">Eco tire didesain untuk meningkatkan efisiensi penggunaan bahan bakar. Tipe ban
                    yang satu ini
                    dibuat dengan dilapisi silika agar cengkraman atau grip ke jalan jadi jauh lebih bagus. Rolling
                    resistance bisa berkurang dengan adanya lapisan silika tersebut, sehingga Anda tidak memerlukan
                    banyak bahan bakar.</p>
            </div>
            <hr>
            <div class="p-1 col-10">
                <h5 class="text-dark mb-2">Informasi untuk Pemesan:</h5>
                <ArgonInput type="text"
                    placeholder="Contoh: Barang sedang dalam proses pembuatan komponen mur di PT Mur Nasional"
                    name="informasi" size="md"></ArgonInput>
            </div>
            <hr>
            <div class="p-1 col-6">
                <h5 class="text-dark mb-2">Nomor PO Terkait (Opsional):</h5>
                <ArgonInput type="text" placeholder="Contoh: PO0037895" name="informasi" size="md"></ArgonInput>
            </div>
            <div class="row">
                <div class="col-auto">
                    <router-link to="/tracking/pesanan-masuk-detail" tag="button">
                        <span>
                            <argon-button size="md" color="warning">
                                Kembali
                            </argon-button>
                        </span>
                    </router-link>
                </div>
                <div class="col-auto">
                    <router-link to="/tracking/pesanan-masuk-detail" tag="button">
                        <span>
                            <argon-button size="md" color="primary">
                                Simpan
                            </argon-button>
                        </span>
                    </router-link>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

export default {
    name: "edit-order",
    components: {
        ArgonButton,
        ArgonInput,
    },
};
</script>
