<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$myItem" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
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
        filter: {
            id_item: null,
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
                    text: 'Update',
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
            edit: false,
        },
    }),
    computed: {
        ...mapState(d$item, ['g$list', 'g$detail', 'g$myItem', 'g$item']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listMyItem();
    },
    methods: {
        ...mapActions(d$item, ['a$deleteItem', 'a$inquiryDetail', 'a$listMyItem', 'a$inquirygetItem']),

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

        async triggerDetail({ id_item }) {
            try {
                this.input = {
                    id_item: Number(id_item),
                };
                this.$router.push({ name: 'Detail Item', params: { id: id_item } })
                console.log(this.$route.params.id);
            } catch (e) {
                console.error(e);
            }
        },

        // async triggerDetail({ id_item }) {
        //     try {
        //         this.modal.detail = false;
        //         this.$router.push({ name: 'Detail Item', params: { id: id_item } })
        //         // console.log(this.$route.params.id);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },

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