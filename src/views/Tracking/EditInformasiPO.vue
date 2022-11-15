<template>
    <div class="container mt-3 pe-5">
        <div class="card">
            <div class="card-body p-4">
                <div class="row p-1">
                    <h6 class="text-dark">Nomor Item</h6>
                    <div class="col-8 pb-0">
                        <h4 class="font-weight-bolder text-dark">{{ g$get_po_detail.d_order?.d_item.serial_number }}
                        </h4>
                    </div>
                    <div class="col-4">
                        <p class="font-weight-bolder text-danger float-end">{{ new
                                Date(g$get_po_detail.d_po?.deadline).toLocaleDateString("id-ID", {
                                    weekday: 'long', year:
                                        'numeric', month:
                                        'long', day: 'numeric'
                                })
                        }}</p>
                    </div>
                </div>
                <hr>
                <div class="p-1">
                    <h4 class="font-weight-bolder text-dark">{{ g$get_po_detail.d_order?.d_item.name }}</h4>
                    <p class="text-dark">{{ g$get_po_detail.d_order?.d_item.desc }}</p>
                </div>
                <hr>
                <div class="p-1 col-10">
                    <h5 class="text-dark mb-2">Informasi untuk Pemesan:</h5>
                    <argon-input v-model="input.note" type="text"
                        placeholder="Contoh: Barang sedang dalam proses pembuatan komponen mur di PT Mur Nasional"
                        name="informasi" size="md"></argon-input>
                </div>
                <hr>
                <div class="p-1 col-6">
                    <h5 class="text-dark mb-2">Nomor PO Terkait (Opsional):</h5>
                    <argon-input v-model="input.note_po" type="text" placeholder="Contoh: PO0037895" name="informasi"
                        size="md"></argon-input>
                </div>
                <div class="row">
                    <div class="col-auto">
                        <router-link :to="{ name: 'Pesanan Masuk Detail', params: { id: this.$route.params.id_po } }"
                            tag="button">
                            <span>
                                <argon-button size="md" color="warning">
                                    Kembali
                                </argon-button>
                            </span>
                        </router-link>
                    </div>
                    <div class="col-auto">
                        <span>
                            <argon-button @click="triggerEdit()" size="md" color="primary">
                                Simpan
                            </argon-button>
                        </span>
                    </div>
                </div>
                <div id="liveToast"
                    class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
                    role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            Informasi PO Berhasil di Update
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import d$po from '@/stores/dashboard/po';
import { mapActions, mapState } from "pinia";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

export default {
    name: "edit-order",
    data: () => ({
        input: {
        },
    }),
    components: {
        ArgonButton,
        ArgonInput,
    },
    computed: {
        ...mapState(d$po, ['g$get_po_detail'])
    },
    methods: {
        ...mapActions(d$po, ['a$getPoDetail', 'a$editPoDetail']),

        async triggerEdit() {
            const data = {
                id_po: this.$route.params.id_po,
                id_po_detail: this.$route.params.id_po_detail,
            }
            await this.a$editPoDetail(data, this.input);
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
            setTimeout(() => {
                this.$router.push({ name: 'Edit Informasi PO', params: { id_po: this.$route.params.id_po, id_po_detail: this.$route.params.id_po_detail } });
            }, 2000);
        }
    },
    async mounted() {
        try {
            await this.a$getPoDetail({ id_po: this.$route.params.id_po, id_po_detail: this.$route.params.id_po_detail })

            this.input = {
                note: this.g$get_po_detail.note,
                note_po: this.g$get_po_detail.note_po,
            }
        } catch (error) {
            console.log(error);
        }
    }
};
</script>