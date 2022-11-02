<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="pb-0 text-start mb-3">
                        <h4 class="font-weight-bolder text-dark">Tambah user</h4>
                    </div>
                </div>
                <div class="card">
                    <!-- <div class="card">
                        <data-table :index="false" :data="g$list" @detail="triggerDetail" @delete="triggerDelete" />
                    </div> -->
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Username</label>
                                <argon-input v-model="input.username" type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Password</label>
                                <argon-input v-model="input.password" type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nama
                                    Perusahaan</label>
                                <argon-input v-model="input.name" type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm mb-2">Tingkat
                                    Perusahaan </label>
                                <div class="row p-2">
                                    <div class="col-md-2">
                                        <input type="radio" v-model="input.level" id="tier" value="1" name="tier">
                                        Tier 1
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" v-model="input.level" id="tier" value="2" name="tier"> Tier 2

                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" v-model="input.level" id="tier" value="3" name="tier"> Tier 3

                                    </div>
                                </div>
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Alamat</label>
                                <argon-input v-model="input.address" type="text" />
                            </div>
                            <div class="mb-2">
                                <label for="example-text-input" class="form-control-label text-sm">Nomor Telepon</label>
                                <argon-input v-model="input.phone" type="text" />
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-9">
                            <router-link to="/akun/company" tag="button">
                                <span>
                                    <argon-button @click="addInquiry()" size="md" color="primary">
                                        Tambah
                                    </argon-button>
                                </span>
                            </router-link>
                        </div>
                        <!-- <modal-comp v-model:show="modal.confirm">
                            <template #header>
                                <h3 class="modal-title">Confirm</h3>
                            </template>
                            <template v-if="modal.confirm" #body>
                                <p>
                                    Are you sure you want to create new user <strong>{{ pageTitle }}: {{ input.name
                                    }}</strong>?
                                </p>
                            </template>
                            <template #footer>
                                <argon-button color="secondary" @click="modal.confirm = false">
                                    Close
                                </argon-button>
                                <argon-button color="danger" @click="addInquiry()">Save </argon-button>
                            </template>
                        </modal-comp> -->
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

import d$company from '@/stores/dashboard/company';
import { mapActions, mapState } from 'pinia';

const tier = {
    0: "admin",
    1: "Tier 1",
    2: "Tier 2",
    3: "Tier 3",
}

export default {
    name: 'Add-user',
    data: () => ({
        pageTitle: 'Add-user',
        // Input
        input: {
            id: null,
            username: '',
            password: '',
            name: '',
            level: '',
            alamat: '',
            phone: '',
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
    },

    computed: {
        ...mapState(d$company, ['g$list', 'g$detail']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$inquiryList();
    },
    methods: {
        ...mapActions(d$company, ['a$inquiryList', 'a$inquiryEdit', 'a$inquiryDel', 'a$inquiryDetail', 'a$inquiryAdd']),

        clear() {
            this.input = {
                id: null,
                name: '',
                username: '',
                level: '',
            };
        },

        async init() {
            try {
                await this.a$inquiryList();
            } catch (e) {
                console.error(e);
            }
        },

        async addInquiry() {
            try {
                const { username, password, name, level, address, phone } = this.input;
                const data = {
                    username, password, level: parseInt(level), name, address, phone
                };
                await this.a$inquiryAdd(data);
                this.modal.add = false;
                console.log(`Add ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },
        async editInquiry() {
            try {
                const { id, name, address, phone } = this.input;
                const data = {
                    name,
                    address, phone
                };
                await this.a$inquiryEdit(id, data);
                this.modal.detail = false;
                console.log(`Edit ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },
        async delInquiry() {
            try {
                const { id_company } = this.input;
                await this.a$inquiryDel(id_company);
                this.modal.confirm = false;
                console.log(`Delete ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },

        async triggerDetail({ id_user, name, address, phone }) {
            try {
                this.input = {
                    id: id_user,
                    name,
                    address,
                    phone,
                };
                this.modal.detail = true;
            } catch (e) {
                console.error(e);
            }
        },
        async triggerDelete({ id_company }) {
            try {
                this.input = {
                    id_company
                };
                this.modal.confirm = true;
            } catch (e) {
                console.error(e);
            }
        },
    },
    watch: {
        modals(val) {
            if (!val) this.clear();
        }
    },
};
</script>