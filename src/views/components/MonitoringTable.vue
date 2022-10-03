<template>
    <div class="card mb-4">
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-dark text-sm font-weight-bolder align-middle text-center">No.
                            </th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">Nama
                                Perusahaan</th>
                            <th class="text-dark text-sm font-weight-bolder align-middle text-center">Tier</th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">Nama
                                Barang</th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">Jumlah Barang
                            </th>
                            <th class="text-dark text-sm font-weight-bolder ps-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="align-middle text-center">
                                    <h6 class="mb-0 text-dark text-sm">1</h6>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">PT Tier 1 Manucfacturing</p>
                            </td>
                            <td class="align-middle text-center">
                                <p class="mb-0 text-info text-sm font-weight-bold">1</p>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">Roda Eco Tire</p>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">1000</p>
                            </td>
                            <td class="align-middle">
                                <span>
                                    <argon-button size="md" color="primary">
                                        Detail
                                    </argon-button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="align-middle text-center">
                                    <h6 class="mb-0 text-dark text-sm">2</h6>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">PT Tier 2 Manucfacturing</p>
                            </td>
                            <td class="align-middle text-center">
                                <p class="mb-0 text-warning text-sm font-weight-bold">2</p>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">Roda Eco Tire</p>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">1000</p>
                            </td>
                            <td class="align-middle">
                                <span>
                                    <argon-button size="md" color="primary">
                                        Detail
                                    </argon-button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="align-middle text-center">
                                    <h6 class="mb-0 text-dark text-sm">3</h6>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">PT Tier 3 Manucfacturing</p>
                            </td>
                            <td class="align-middle text-center">
                                <p class="mb-0 text-success text-sm font-weight-bold">3</p>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">Roda Eco Tire</p>
                            </td>
                            <td>
                                <p class="mb-0 text-dark text-sm font-weight-bold">1000</p>
                            </td>
                            <td class="align-middle">
                                <span>
                                    <argon-button size="md" color="primary">
                                        Detail
                                    </argon-button>
                                </span>
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
    name: "monitoring-table",
    components: {
        ArgonButton,
    },
};
</script>