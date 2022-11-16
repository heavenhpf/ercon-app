<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="pb-0 text-start mb-3">
                <h4 class="font-weight-bolder text-dark">List Perusahaan</h4>
            </div>
            <div class="pb-0 row mb-lg-3 mb-2">
                <div class="col-lg-8 col-md-9">
                    <router-link to="/akun/tambah-company" tag="button">
                        <span>
                            <argon-button size="md me-2" color="primary">
                                <span class="fa fa-plus fa-sm me-2" />
                                Tambah
                            </argon-button>
                        </span>
                    </router-link>
                </div>
            </div>
            <div>
                <company-table />
            </div>
        </div>
    </div>
</template>

<script>
import CompanyTable from "@/components/tables/CompanyTable.vue";
import auth from '@/router/routes/auth';

export default {
    name: 'company',
    components: {
        CompanyTable,
    },
}
</script>