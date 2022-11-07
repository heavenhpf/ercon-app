<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$myItem" :columns="dt.column"
                :actions="dt.action" @edit="triggerEdit" @delete="triggerDelete" />
        </div>
        <modal-comp size="lg" v-model:show="modal.edit">
            <template #header>
                <h2 class="modal-title">Edit {{ pageTitle }}</h2>
            </template>
            <template v-if="modal.edit" #body>
                <div class="row">
                    <div class="col-12">
                        <select @change="triggerOptions()" v-model.number="input.id_category"
                            class="form-select form-select-md mb-3" placehoder="Kategori Item"
                            aria-label=".form-select-md example">
                            <option v-for='items in g$listCategory' v-bind:value="items.id_category">
                                {{ items.name }}
                            </option>
                        </select>
                    </div>
                    <h4>{{ g$listCategory[selectedCategory] }}</h4>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model='input.name' type="text" placeholder="Name Item" name="name" size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model='input.desc' type="text" placeholder="Deskripsi Item" name="desc"
                            size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model='input.serial_number' type="text" placeholder="Serial Number"
                            name="serial_number" size="md">
                        </argon-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <argon-input v-model='input.unit' type="text" placeholder="Unit" name="unit" size="md">
                        </argon-input>
                    </div>
                </div>
            </template>
            <template #footer>
                <argon-button color="secondary" @click="modal.edit = false">
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
                    Apakah Anda yakin ingin menghapus <b>item</b> ini?
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
import d$item from '@/stores/dashboard/item';
import d$category from '@/stores/dashboard/category';
import auth from '../../router/routes/auth';

export default {
    // name: 'Monitoring',
    data: () => ({
        pageTitle: 'Item',
        // Input
        input: {
            id_item: null,
            id_category: null,
            name: '',
            desc: '',
            serial_number: '',
            unit: '',
        },

        filterCategory: {
            value: ``,
        },

        // DataTable
        dt: {
            column: [
                {
                    name: 'serial_number',
                    th: 'Nomor Barang',
                },
                {
                    name: 'name',
                    th: 'Nama Item',
                },
                {
                    name: 'ref_category.name',
                    th: 'Kategori',
                    render: ({ ref_category }) => ref_category.name,
                },
                {
                    name: 'quantity',
                    th: 'Jumlah Barang  ',
                },
                {
                    name: 'unit',
                    th: 'Satuan',
                },
            ],
            action: [
                {
                    text: 'Edit',
                    color: 'primary',
                    event: 'edit',
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
            edit: false,
        },
    }),
    computed: {
        ...mapState(d$item, ['g$list', 'g$detail', 'g$myItem']),
        ...mapState(d$category, ['g$listCategory']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listMyItem();
        await this.a$categoryList();
    },
    methods: {
        ...mapActions(d$item, ['a$editItem', 'a$deleteItem', 'a$inquiryDetail', 'a$listMyItem', 'a$inquiryAdd']),
        ...mapActions(d$category, ['a$categoryList']),

        clear() {
            this.input = {
                id_item: null,
                id_category: null,
                name: '',
                desc: '',
                serial_number: '',
                unit: '',
            };
        },

        async init() {
            try {
                await this.a$listMyItem();
                await this.a$inquiryAdd();
            } catch (e) {
                console.error(e);
            }
        },
        async addInquiry() {
            try {
                const { name } = this.input;
                const data = {
                    name,
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
                const { id_item, id_category, name, desc, serial_number, unit } = this.input;
                const data = {
                    id_category, name, desc, serial_number, unit
                };
                await this.a$editItem(Number(id_item), data);
                this.modal.edit = false;
                console.log(`Edit ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },
        async delInquiry() {
            try {
                const { id_item } = this.input;
                await this.a$deleteItem(id_item);
                this.modal.confirm = false;
                console.log(`Delete ${this.pageTitle} Succeed!`);
            } catch (e) {
                console.error(e);
            } finally {
                await this.init();
            }
        },

        async triggerEdit({ name, desc, serial_number, unit, id_category, id_item }) {
            try {
                this.input = {
                    name,
                    desc,
                    serial_number,
                    unit,
                    id_category,
                    id_item
                };
                this.modal.edit = true;
            } catch (e) {
                console.error(e);
            }
        },
        async triggerDelete({ id_item }) {
            try {
                this.input = {
                    id_item
                };
                this.modal.confirm = true;
            } catch (e) {
                console.error(e);
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