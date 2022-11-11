<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="card mb-5 col-9">
                <div class="card-header p-3 pb-0">
                    <div class="text-start">
                        <div class="row">
                            <div class="col-9 p-1">
                                <h3 class="font-weight-bolder text-dark">{{ g$item.name }}</h3>
                            </div>
                            <div class="col-3 p-1 ps-6">
                                <span>
                                    <argon-button @click="triggerEditItem()" size="sm" color="primary">
                                        <span class="fa fa-pencil-square-o fa-md me-2" />
                                        Edit
                                    </argon-button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body p-3 pb-0">
                    <p class="text-dark"
                        style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;">
                        {{ g$item.desc }}
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
                            <h5 class="row justify-content-center font-weight-bolder">{{ g$item.quantity }}</h5>
                            <h6 class="row justify-content-center">{{ g$item.unit }}</h6>
                        </div>
                        <div class="p-4 mb-0 col-12 d-flex justify-content-center">
                            <span>
                                <argon-button @click="triggerEditBuffer()" size="md" color="primary">
                                    <span class="fa fa-pencil-square-o fa-md me-2" />
                                    Edit
                                </argon-button>
                            </span>
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
            <modal-comp size="lg" v-model:show="modal.editBuffer">
                <template #header>
                    <h3 class="modal-title">Edit Jumlah Buffer</h3>
                </template>
                <template v-if="modal.editBuffer" #body>
                    <div class="row">
                        <div class="col-12">
                            <div class="pb-0 text-start mb-4">
                                <h4 class="font-weight-bolder text-dark">{{ g$item.name }}</h4>
                            </div>
                            <div class="row mb-3">
                                <div class="col-9">
                                    <div class="mb-2">
                                        <p class="font-weight-bolder text-dark">Masukkan jumlah buffer terkini:</p>
                                    </div>
                                    <div class="mb-3 col-9">
                                        <!-- <argon-input v-model="input.username" type="text" required/> -->
                                        <argon-input v-model.number="input.quantity" type="number" isRequired="true" />
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="card">
                                        <div class="card-header d-flex justify-content-center">
                                            <span class="badge text-dark text-lg"
                                                style="background-color: yellow;">Buffer</span>
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-center">
                                                <img src="@/assets/img/illustrations/box.png" alt="warning"
                                                    style="width: 80%; height: 80%;">
                                            </div>
                                            <h4 class="row justify-content-center">{{ g$item.quantity }} {{ g$item.unit }}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <span>
                        <argon-button @click="toggleBack()" size="md" color="warning" class="me-2">
                            Kembali
                        </argon-button>
                    </span>
                    <span>
                        <argon-button @click="editBuffer()" size="md" color="primary" class="me-2">
                            Simpan Perubahan
                        </argon-button>
                    </span>
                </template>
            </modal-comp>
            <modal-comp size="lg" v-model:show="modal.editItem">
                <template #header>
                    <h3 class="modal-title">Edit Informasi Item</h3>
                </template>
                <template v-if="modal.editItem" #body>
                    <div class="row">
                        <div class="col-12">
                            <div class="row mb-3">
                                <div class="col-9">
                                    <div class="mb-3 col-9">
                                        <select v-model.number="input.id_category"
                                            class="form-select form-select-md mb-3"
                                            aria-label=".form-select-lg example">
                                            <option v-for='items in g$listCategory' v-bind:value="items.id_category">{{ items.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3 col-9">
                                        <argon-input v-model="input.name" isRequired="true" />
                                    </div>
                                    <div class="mb-3 col-9">
                                        <argon-input v-model="input.desc" isRequired="true" />
                                    </div>
                                    <div class="mb-3 col-9">
                                        <argon-input v-model="input.serial_number" isRequired="true" />
                                    </div>
                                    <div class="mb-3 col-9">
                                        <argon-input v-model="input.unit" isRequired="true" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <span>
                        <argon-button @click="toggleBack()" size="md" color="warning" class="me-2">
                            Kembali
                        </argon-button>
                    </span>
                    <span>
                        <argon-button @click="editItem()" size="md" color="primary" class="me-2">
                            Simpan Perubahan
                        </argon-button>
                    </span>
                </template>
            </modal-comp>
        </div>
    </div>
</template>

<script>
import d$item from '@/stores/dashboard/item';
import d$category from '@/stores/dashboard/category';
import { mapActions, mapState } from "pinia";
import ItemTable from "@/components/examples/ItemTable.vue";
import ArgonButton from '@/components/ArgonButton.vue';

export default {
    name: "detail-item",
    data: () => ({
        input: {
        },
        modal: {
            editBuffer: false,
            editItem: false,
        },
    }),
    components: {
        ItemTable,
        ArgonButton,
    },
    filter: {
        id: null,
    },
    computed: {
        ...mapState(d$item, ['g$item']),
        ...mapState(d$category, ['g$listCategory']),
    },
    methods: {
        ...mapActions(d$item, ['a$inquirygetItem', 'a$editBuffer', 'a$editItem']),
        ...mapActions(d$category, ['a$categoryList']),

        async init() {
            try {
                await this.a$inquirygetItem({ id: this.$route.params.id });
            } catch (error) {
                throw error;
            }
        },

        async triggerEditBuffer() {
            try {
                this.modal.editBuffer = true;
            } catch (error) {
                throw error
            }
        },

        async triggerEditItem() {
            try {
                this.modal.editItem = true;
            } catch (error) {
                throw error
            }
        },

        async toggleBack() {
            try {
                this.modal.editBuffer = false;
                this.modal.editItem = false;
            } catch (error) {
                throw error;
            }
        },

        async editBuffer() {
            try {
                const { quantity } = this.input;
                const data = {
                    quantity,
                };
                await this.a$editBuffer(this.$route.params.id, data);
                this.modal.editBuffer = false;
            } catch (error) {
                throw error;
            } finally {
                this.init();
            }
        },
        
        async editItem() {
            try {
                const { id_category, name, desc, unit, serial_number } = this.input;
                const data = {
                    id_category,
                    name,
                    desc,
                    unit,
                    serial_number,
                };
                await this.a$editItem(this.$route.params.id, data);
                this.$router.push({ name: 'Gudang Saya' })
            } catch (error) {
                throw error;
            } finally {
                this.init();
            }
        },
    },
    async mounted() {
        try {
            await this.a$inquirygetItem({ id: this.$route.params.id });
            await this.a$categoryList();
            this.input = {
                ...this.g$item,
            };
        } catch (e) {
            throw e;
        }
    }
};
</script>