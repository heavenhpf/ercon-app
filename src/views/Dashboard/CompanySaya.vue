<template>
  <div class="container-fluid">
      <div class="page-header min-height-200"
          style="background-color: #3B82F6; margin-right: -24px; margin-left: -34%;">
      </div>
      <div class="card shadow-lg mt-n6 p-1 w-60 mx-auto">
          <div class="card-body p-4">
              <div class="row gx-4">
                  <div class="mb-0">
                      <h5>{{g$getMyCompany.name}}</h5>
                  </div>
                  <div class="mb-2">
                      <h6 class="font-weight-bold text-sm">{{ g$username }}</h6>
                  </div>
                  <div class="d-flex align-items-center">
                      <p class="mb-0">{{ g$getMyCompany.address }}</p>
                      <p class="mb-0 ms-auto">{{ g$getMyCompany.phone }}</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="py-4 container-fluid">
          <div class="row">
              <div class="card">
                  <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                          <h5 class="mb-0">Edit Profil</h5>
                          <argon-button color="warning" size="sm" class="ms-auto">Settings</argon-button>
                      </div>
                  </div>
                  <div class="card-body">
                      <div class="row mb-2">
                          <div class="col-6">
                              <label for="example-text-input" class="form-control-label text-sm">Password</label>
                              <argon-input type="text" />
                          </div>
                          <div class="col-6">
                              <label for="example-text-input" class="form-control-label text-sm">Nomor Telepon</label>
                              <argon-input type="text" />
                          </div>
                      </div>
                      <div class="mb-5">
                          <label for="example-text-input" class="form-control-label text-sm">Alamat</label>
                          <argon-textarea type="text" />
                      </div>
                      <argon-button color="primary" size="md" class="ms-auto">Simpan Perubahan</argon-button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonTextarea from "@/components/ArgonTextarea.vue";
import d$company from '@/stores/dashboard/company';
import d$user from '@/stores/dashboard/user';
import { mapActions, mapState } from "pinia";

export default {
  name: "profile",
  components: {
      ArgonInput,
      ArgonButton,
      ArgonTextarea
  },

  // async created() {
  //     try {
  //         const { data } = await baseApi.get(`/companies/my`);
  //         this.posts = data.data;
  //     } catch (e) {
  //         console.error(e);
  //     }
  // },


  computed: {
      ...mapState(d$company, ['g$getMyCompany']),
      ...mapState(d$user, ['g$username'])
  },
  methods: {
      ...mapActions(d$company, ['a$getMyCompany']),
      ...mapActions(d$user, ['a$username'])
  },
  async mounted() {
      try {
          await this.a$getMyCompany();
          await this.a$username();
      } catch (e) {
      }
  }
};
</script>
