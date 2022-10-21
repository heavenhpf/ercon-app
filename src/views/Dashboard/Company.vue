<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="pb-0 text-start mb-3">
                <h4 class="font-weight-bolder text-dark">Company List</h4>
            </div>
            <div class="pb-0 row mb-lg-3 mb-2">
                <div class="col-lg-8 col-md-9">
                    <router-link to="/dashboard/add-company" tag="button">
                        <span>
                            <argon-button size="md me-2" color="primary">
                                <span class="fa fa-plus fa-sm me-2" />
                                Tambah
                            </argon-button>
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card">
            <data-table style="text-align: center;" index="false" :data="g$list" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <modal-comp v-model:show="modal.add">
            <template #header>
                <h3 class="modal-title">Add New {{ pageTitle }}</h3>
            </template>
            <template v-if="modal.add" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.name" type="text" placeholder="Name" name="name" size="md">
                        </argon-input>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.add = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="addInquiry()">
                    Save Changes
                </argon-button>
            </template>
        </modal-comp>
        <modal-comp v-model:show="modal.detail">
            <template #header>
                <h3 class="modal-title">{{ pageTitle }} Details</h3>
            </template>

            <!-- buat ngerubah detail -->
            <template v-if="modal.detail" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.name" type="text" placeholder="Name" name="name" size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.address" type="text" placeholder="Address" name="address" size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model="input.phone" type="text" placeholder="Phone" name="phone" size="md">
                        </argon-input>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.detail = false">
                    Close
                </argon-button>
                <argon-button color="primary" @click="editInquiry()">
                    Save Changes
                </argon-button>
            </template>
        </modal-comp>
        <modal-comp v-model:show="modal.confirm">
            <template #header>
                <h3 class="modal-title">Confirm</h3>
            </template>
            <template v-if="modal.confirm" #body>
                <p>
                    Are you sure you want to delete <strong>{{ pageTitle }}: {{ input.name }}</strong>?
                </p>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.confirm = false">
                    Close
                </argon-button>
                <argon-button color="danger" @click="delInquiry()">Delete</argon-button>
            </template>
        </modal-comp>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import d$company from '@/stores/dashboard/company';
import auth from '@/router/routes/auth';

// const statusColor = {
//     0: "belim deadline",
//     1: "diproses",
// }

export default {
    name: 'Company',
    data: () => ({
        pageTitle: 'Company',
        // Input
        input: {
            id: null,
            name: '',
        },
        // DataTable
        dt: {
            column: [
                // {
                //     name: 'id_company',
                //     th: 'no',
                // },
                {
                    name: 'name',
                    th: 'Nama Perusahaan',
                },
                {
                    name: 'auth_user.level',
                    th: 'Tier',
                    render: ({ auth_user }) => auth_user.level
                },
                {
                    name: 'auth_user.username',
                    th: 'Username',
                    render: ({ auth_user }) => auth_user.username
                },
                // {
                //     name: 'auth_user.username',
                //     th: 'Username',
                //     render: ({ auth_user }) => {
                //         const auth = auth ? 1 : 0
                //         return `<span[${statusColor}]`
                //     },

                // },
                {
                    name: 'address',
                    th: 'alamat',
                },

                {
                    name: 'phone',
                    th: 'Nomor telepon',
                },
            ],
            action: [
                {
                    text: 'Edit',
                    color: 'primary',
                    event: 'detail',
                },
                {
                    text: 'Delete',
                    color: 'danger',
                    event: 'delete',
                },
            ],
        },
        // UI
        modal: {
            add: false,
            detail: false,
            confirm: false,
        },
    }),
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
        ...mapActions(d$company, ['a$inquiryList', 'a$inquiryEdit', 'a$inquiryDel', 'a$inquiryDetail']),

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
                const { username, password, level, name, address, phone } = this.input;
                const data = {
                    username, password, level, name, address, phone
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

        async triggerDetail({ id_company, name, address, phone }) {
            try {
                this.input = {
                    id: id_company,
                    name,
                    address,
                    phone,
                };

            } catch (e) {
                console.error(e);
            }
        },

        // buat manggil page baru di page selanjutnya

        // async triggerDetail({ id_company, name, address, phone }) {
        //     try {
        //         this.input = {
        //             id: id_company,
        //             name,
        //             address,
        //             phone,
        //         };
        //         this.modal.detail = true;
        //         this.$router.push({ name: 'TrackingDetail', params: { id: id_company, status: status }})
        //         console.log(this.$route.params.id);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },

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