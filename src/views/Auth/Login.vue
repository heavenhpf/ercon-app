<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-5 col-lg-5 col-md-6 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header">
                  <img src="../../assets/img/ercon-logo.png" class="col-6">
                </div>
                <div class="pb-0 card-body text-start">
                  <h4 class="font-weight-bolder">Selamat Datang</h4>
                  <p class="mb-0">Silakan masukkan username dan password Anda untuk Sign In.</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="submit">
                    <div class="mb-3">
                      <argon-input v-model="input.username" type="text" placeholder="Username" name="username" size="lg"
                        isRequired="true" />
                    </div>
                    <div class="mb-3">
                      <argon-input v-model="input.password" type="password" placeholder="Password" name="password"
                        size="lg" isRequired="true" />
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <argon-switch v-model="input.remember" id="rememberMe">Remember me</argon-switch>
                      </div>
                      <div class="col-6">
                        <a href="https://www.google.com">
                          <p class="mb-0 float-end">Lupa kata sandi?</p>
                        </a>
                      </div>
                    </div>
                    <div class="text-center">
                      <argon-button class="mt-4" color="primary" fullWidth size="lg" type="submit">
                        Sign in</argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 pbx-7 d-flex flex-column justify-content-center overflow-hidden"
                style="background-size: cover;">
                <img src="../../assets/img/img-login.png">
                <span class="mask bg-gradient-success opacity-1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="error"
        class="toast position-fixed top-0 start-50 translate-middle-x mt-4 align-items-center text-white bg-danger"
        role="alert" style="text-align: center; z-index: 1;" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            User Tidak Ditemukan!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'pinia';
import d$auth from '@/stores/auth.d';

import Navbar from '@/examples/PageLayout/Navbar.vue';
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonSwitch from '@/components/ArgonSwitch.vue';
import ArgonButton from '@/components/ArgonButton.vue';
const body = document.getElementsByTagName('body')[0];

export default {
  name: 'signin',
  data: () => ({
    input: {
      username: '',
      password: '',
    },
  }),
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  methods: {
    ...mapActions(d$auth, ['a$login']),
    async submit() {
      try {
        await this.a$login(this.input);
        this.$router.push({ name: 'Default' });
      } catch (e) {
        // console.error(e);
        const toastError = document.getElementById('error')
        const toast = new bootstrap.Toast(toastError)
        toast.show()
        setTimeout(() => {
        }, 2000);
      }
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove('bg-gray-100');
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add('bg-gray-100');
  },
};
</script>