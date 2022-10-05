<template>
    <div class="card mb-4">
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-dark text-sm font-weight-bolder">Nomor VO
                            </th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">ID Order</th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">Nama Item</th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">Jumlah</th>
                            <th class="text-dark text-sm font-weight-bolder ps-7">Progress</th>
                            <th class="text-dark text-sm font-weight-bolder ps-4">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="d-flex px-3">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">PO00014578 - 1</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">3572</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">Roda Eco Tire</h6>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-center">
                            </td>
                            <td>
                            </td>
                            <td class="align-middle">
                                <router-link to="/tracking/po-detail" tag="button">
                                    <span>
                                        <argon-button size="md" color="warning">
                                            Detail
                                        </argon-button>
                                    </span>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import ArgonButton from "@/components/ArgonButton.vue";
export default {
    name: "po-table",
    components: {
        ArgonButton,
    },
};
</script>