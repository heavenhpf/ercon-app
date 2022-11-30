<template>
    <div class="table-responsive p-0">
        <div class="card">
            <data-table style="text-align:center ;" index="false" :data="g$list_po_detail" :columns="dt.column"
                :actions="dt.action" @detail="triggerDetail" @delete="triggerDelete" />
        </div>
        <modal-comp size="lg" v-model:show="modal.detail">
            <template #header>
                <h2 class="modal-title">Add New {{ pageTitle }}</h2>
            </template>
            <template v-if="modal.add" #body>
                <div class="row">
                    <div class="col-12">
                        <argon-input pe="text" placeholder="Name" name="name" size="md">
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
        <modal-comp size="lg" v-model:show="modal.detail">
            <template #header>
                <div class="col-6 mt-3">
                    <h5>Serial Number</h5>
                    <div>
                        <h6 class="mt-2">{{ g$get_po_detail.d_order?.d_item.serial_number }}</h6>
                    </div>
                </div>
                <div class="mt-3">
                    <p class="font-weight-bolder text-danger float-end text-md-lg d-none d-sm-block d-md-block d-lg-block d-xl-block">Deadline: {{ new
                            Date(g$get_po_detail.d_po?.deadline).toLocaleDateString("id-ID", {
                                weekday: 'long', year:
                                    'numeric', month:
                                    'long', day: 'numeric'
                            })
                    }}</p>
                </div>
            </template>

            <!-- buat ngerubah detail -->
            <template size="lg" v-if="modal.detail" #body>
                <div class="row">
                    <h4 class="col-12">{{ g$get_po_detail.d_order?.d_item.name }}
                    </h4>
                    <h6>Deskripsi Item</h6>
                    <p>{{ g$get_po_detail.d_order.d_item.desc }}</p>
                </div>
                <div>
                    <h6>Informasi Item</h6>
                </div>
                <div>
                    <p>{{ g$get_po_detail.note }} </p>
                </div>
                <div class="mt-2">
                    <h6>Nomor PO Terkait</h6>
                    <div class="row">
                        <div class="col-auto">
                            <div class="rounded" style="background-color: rgba(59, 130, 246, 0.4);">
                                <h6 class="p-2 ps-4 pe-4 text-dark font-weight-bolder text-center" @click.stop.prevent="copyTestingCode">{{
                                        text ?? "-"
                                }}</h6>
                                <input type="hidden" id="testing-code" :value="text">
                            </div>
                        </div>
                        <div class="col-auto">
                            <div id="showToast"
                                class="toast position-fixed top-0 start-50 translate-middle-x mt-3  align-items-center text-white bg-success"
                                role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body" style="text-align:center">
                                        Nomor PO disimpan pada clipboard
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                    aria-label="Close"></button>
                                </div>
                            </div>
                            <argon-button @click="copyTestingCode()" data-bs-toggle="modal"
                                style="background-color: rgba(217, 217, 217);" title="Copy to Clipboard">
                                <span class="fa fa-files-o fa-lg text-dark" />
                            </argon-button>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <!-- <argon-button color="danger" @click="editInquiry()">
                    Kembali
                </argon-button> -->
                <argon-button color="danger" @click="modal.detail = false">
                    Kembali
                </argon-button>
                <router-link class="nav-link" to="/tracking/tracking-tier-bawah">
                    <argon-button color="primary" @click="modal.detail = false">
                        Cari PO
                    </argon-button>
                </router-link>
            </template>
        </modal-comp>
    </div>
</template>

<script>
import d$po from '@/stores/dashboard/po';
import ArgonButton from '@/components/ArgonButton.vue';
import { mapActions, mapState } from "pinia";
import auth from '../../router/routes/auth';

// const progress = {
//     0: "Belum Deadline",
//     1: "Melewati Deadline",
//     2: "Progress Selesai"
// }

export default {
    name: 'POTable',
    data: () => ({
        pageTitle: 'POTable',
        // Input
        input: {
            id: null,
            name: '',
        },

        text: '',
        
        filter: {
            id_po: null,
            id_po_detail: null
        },
        // DataTable
        dt: {
            column: [
                {
                    name: 'd_order.d_item.serial_number',
                    th: 'Serial Number',
                    render: ({ d_order }) => d_order.d_item.serial_number
                },
                {
                    name: 'd_order.d_item.name',
                    th: 'nama item',
                    render: ({ d_order }) => d_order.d_item.name
                },
                {
                    name: 'd_order.quantity',
                    th: 'Jumlah Pesanan',
                    render: ({ d_order }) => d_order.quantity
                },
                {
                    name: 'd_order.d_item.unit',
                    th: 'Satuan',
                    render: ({ d_order }) => d_order.d_item.unit
                },
                {
                    name: 'progress',
                    th: 'progress',
                    render: ({ progress }) => {
                        return `<progress  value="${progress}" max="1">${progress}%</progress>`
                    }
                },
            ],
            action: [
                {
                    text: 'Detail',
                    color: 'warning',
                    event: 'detail',
                }
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
        ...mapState(d$po, ['g$list_po_detail', 'g$get_po_detail', 'g$po']),
        modals() {
            return Object.values(this.modal).includes(true);
        }
    },
    async mounted() {
        await this.a$listPoDetail({ id_po: this.$route.params.id });
    },
    // async addInquiry() {
    //     // Get the text field
    //     var copyText = document.getElementById("myInput");

    //     // Select the text field
    //     copyText.select();
    //     copyText.setSelectionRange(0, 99999); // For mobile devices

    //     // Copy the text inside the text field
    //     navigator.clipboard.writeText(copyText.value);

    //     // Alert the copied text
    //     alert("Copied the text: " + copyText.value);
    // },

    // async copy() {
    //     try {
    //         const toastLiveExample = document.getElementById('showToast').value
    //         const toast = new bootstrap.Toast(toastLiveExample)
    //         toast.show()
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         // await this.init();
    //     }
    // },
    methods: {
        ...mapActions(d$po, ['a$listPoDetail', 'a$getPoDetail']),

        // getPOValue(){
        //     this.$refs.clone.focus();
        //     document.execCommand("copy");

        //     const toastLiveExample = document.getElementById('liveToast')
        //     const toast = new bootstrap.Toast(toastLiveExample)
        //     toast.show()
        // },
        copyTestingCode() {
          let testingCodeToCopy = document.querySelector('#testing-code')
          testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
          testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                // alert('Testing code was copied ' + msg);
                const toastLiveExample = document.getElementById('showToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                    this.$router.push({ name: 'Tracking Tier Bawah' });
                }, 1000);
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        async triggerDetail({ id_po_detail, id_po }) {
            try {
                this.filter_po_detail = {
                    id_po: Number(id_po),
                    id_po_detail: Number(id_po_detail)
                }
                await this.a$getPoDetail(this.filter_po_detail);
                this.text = this.g$get_po_detail.note_po;
                this.modal.detail = true;
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>