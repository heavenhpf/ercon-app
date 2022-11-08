<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" :index="false" :data="g$myItem" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" />
        </div>
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
        ...mapActions(d$item, ['a$editItem', 'a$inquiryDetail', 'a$listMyItem', 'a$inquiryAdd']),
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

        // async triggerDetail({ id_item }) {
        //     try {
        //         this.input = {
        //             id: id_item,
        //         };
        //         this.modal.detail = false;
        //         this.$router.push({ name: 'Update Produksi', params: { id: id_item } })
        //         console.log(this.$route.params.id);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },

        async triggerDetail() {
            try {
                // this.input = {
                //     id: id_item,
                // };
                // this.modal.detail = false;
                this.$router.push({ name: 'Update Produksi' })
                // console.log(this.$route.params.id);
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