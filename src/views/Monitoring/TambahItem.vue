<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="pb-0 text-start mb-3">
                        <h4 class="font-weight-bolder text-dark">Tambah Item</h4>
                    </div>
                </div>
                <div class="card">
                    <!-- <div class="card">
                        <data-table :index="false" :data="g$list" @detail="triggerDetail" @delete="triggerDelete" />
                    </div> -->
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nomor Item</label>
                                <argon-input v-model='input.serial_number' type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nama Item</label>
                                <argon-input v-model='input.name' type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Kategori Item</label>
                                <!-- <argon-input v-model.number='input.id_category' type="number" /> -->
                                <select @change="triggerOptions()" v-model.number="input.id_category"
                                    class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                                    <option v-for='items in g$listCategory' v-bind:value="items.id_category" selected>
                                    <option>{{ items.name }}</option>
                                    </option>
                                </select>
                                <h4>{{ g$listCategory[selectedCategory] }}</h4>
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Deskripsi
                                    Item</label>
                                <argon-input v-model='input.desc' type="text" />
                            </div>
                            <div class="mb-2 col-6">
                                <label for="example-text-input" class="form-control-label text-sm">Jumlah Item</label>
                                <argon-input v-model.number='input.quantity' type="number" />
                            </div>
                            <div class="mb-2 col-6">
                                <label for="example-text-input" class="form-control-label text-sm">Satuan</label>
                                <argon-input v-model='input.unit' type="text" />
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9">
                            <!-- <router-link to="/monitoring/gudang-saya"> -->
                            <div id="liveToast"
                                class="w-75 w-md-30 w-lg-30 toast position-fixed top-5 start-50 translate-middle-x align-items-center text-white bg-success"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        Item Berhasil ditambahkan
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                        data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                            </div>
                            <argon-button id="showToastb" href="/monitoring/gudang-saya" @click="addInquiry()" size="md"
                                color="primary" data-bs-toggle="modal" class="me-2">
                                Tambah
                            </argon-button>
                            <router-link to="/monitoring/gudang-saya" tag="button">
                                <span>
                                    <argon-button size="md" color="warning">
                                        Kembali
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
import ArgonAlert from "@/components/ArgonAlert.vue";
import ArgonTextarea from "@/components/ArgonTextarea.vue";

import d$item from '@/stores/dashboard/item';
import d$category from '@/stores/dashboard/category';
import { mapActions, mapState } from 'pinia';


export default {
    name: 'tambah-item',
    data: () => ({
        pageTitle: 'tambah-item',
        // Input
        input: {
            id_category: null,
            name: '',
            desc: '',
            serial_number: '',
            quantity: null,
            unit: '',
        },
        filterCategory: {
            value: ``,
        },


        // UI
        modal: {
            add: false,
            detail: false,
            confirm: false,
        },
    }),

    components: {
        ArgonInput,
        ArgonButton,
        ArgonRadio,
        ArgonAlert,
        ArgonTextarea,
    },

    computed: {
        ...mapState(d$item, ['g$list', 'g$detail']),
        ...mapState(d$category, ['g$listCategory']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$categoryList();
    },
    methods: {
        ...mapActions(d$item, ['a$inquiryAdd']),
        ...mapActions(d$category, ['a$categoryList']),

        clear() {
            this.input = {
                id_category: null,
                name: '',
                desc: '',
                serial_number: null,
                quantity: null,
            };
        },

        async init() {
            try {
                await this.a$inquiryAdd();
            } catch (e) {
                console.error(e);
            }
        },

        async addInquiry() {
            try {
                const { id_category, name, desc, serial_number, quantity, unit } = this.input;
                const data = {
                    id_category, name, desc, serial_number, quantity, unit
                };
                await this.a$inquiryAdd(data);
                this.modal.add = false;
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                    this.$router.push({ name: 'Gudang Saya' });
                }, 2000);

            } catch (e) {
                console.error(e);
            } finally {
                // await this.init();
            }
        },

        async triggerOptions() {
            try {
                const { selectedCategory } = this.filterCategory;
                const data = {
                    category: selectedCategory.id_category,
                };
                // console.log(data.id_category);
                // console.log(data);
                // await this.a$listAllItem(data);
            }
            catch (e) {
                console.log(e);
            }
        }

    },
    watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
};
</script>