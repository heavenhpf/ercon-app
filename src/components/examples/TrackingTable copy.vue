<template>
    <div class="card mb-4">
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-dark text-sm font-weight-bolder">Nomor VO
                            </th>
                            <th class="text-dark text-sm font-weight-bolder ps-2">Nama
                                Perusahaan</th>
                            <th class="text-dark text-sm font-weight-bolder ps-7">Capaian
                            </th>
                            <th
                                class="text-dark text-sm font-weight-bolder ps-4">
                                Status</th>
                            <th class="text-dark text-sm font-weight-bolder ps-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="d-flex px-3">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">PO00014578</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-dark text-xs font-weight-bold mb-1">PT Toyota Manucfacturing</p>
                                <p class="text-xs text-danger mb-0">Deadline 30 September 2022</p>
                            </td>
                            <td class="align-middle text-center">
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="me-2 text-xs font-weight-bold">60%</span>
                                    <div>
                                        <div class="progress">
                                            <div class="progress-bar bg-gradient-info" role="progressbar"
                                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                style="width: 60%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="text-primary text-xs font-weight-bold">Belum Deadline</span>
                            </td>
                            <td class="align-middle">
                                <router-link to="/dashboard/tracking-detail" tag="button">
                                    <span>
                                        <argon-button size="md" color="warning">
                                            Detail
                                        </argon-button>
                                    </span>
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-3">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">PO00014578</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-dark text-xs font-weight-bold mb-1">PT Toyota Manucfacturing</p>
                                <p class="text-xs text-danger mb-0">Deadline 30 September 2022</p>
                            </td>
                            <td class="align-middle text-center">
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="me-2 text-xs font-weight-bold">60%</span>
                                    <div>
                                        <div class="progress">
                                            <div class="progress-bar bg-gradient-info" role="progressbar"
                                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                style="width: 60%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="text-primary text-xs font-weight-bold">Belum Deadline</span>
                            </td>
                            <td class="align-middle">
                                <span>
                                    <argon-button size="md" color="warning">
                                        Detail
                                    </argon-button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-3">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">PO00014578</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-dark text-xs font-weight-bold mb-1">PT Toyota Manucfacturing</p>
                                <p class="text-xs text-danger mb-0">Deadline 30 September 2022</p>
                            </td>
                            <td class="align-middle text-center">
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="me-2 text-xs font-weight-bold">60%</span>
                                    <div>
                                        <div class="progress">
                                            <div class="progress-bar bg-gradient-info" role="progressbar"
                                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                style="width: 60%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="text-success text-xs font-weight-bold">Progress Selesai</span>
                            </td>
                            <td class="align-middle">
                                <span>
                                    <argon-button size="md" color="warning">
                                        Detail
                                    </argon-button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex px-3">
                                    <div class="my-auto">
                                        <h6 class="mb-0 text-sm">PO00014578</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-dark text-xs font-weight-bold mb-1">PT Toyota Manucfacturing</p>
                                <p class="text-xs text-danger mb-0">Deadline 30 September 2022</p>
                            </td>
                            <td class="align-middle text-center">
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="me-2 text-xs font-weight-bold">60%</span>
                                    <div>
                                        <div class="progress">
                                            <div class="progress-bar bg-gradient-info" role="progressbar"
                                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                style="width: 60%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="text-success text-xs font-weight-bold">Progress Selesai</span>
                            </td>
                            <td class="align-middle">
                                <span>
                                    <argon-button size="md" color="warning">
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
    name: "tracking-table",
    components: {
        ArgonButton,
    },
};
</script>