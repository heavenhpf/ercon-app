<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-5 col-lg-5 col-md-6 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header">
                  <img src="../assets/img/ercon-logo.png" class="col-6">
                </div>
                <div class="pb-0 card-body text-start">
                  <h4 class="font-weight-bolder">Selamat Datang</h4>
                  <p class="mb-0">Silakan masukkan username dan password Anda untuk Sign In.</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="mb-3">
                      <argon-input type="username" placeholder="Username" name="username" size="lg" isRequired="required" />
                    </div>
                    <div class="mb-3">
                      <argon-input type="password" placeholder="Password" name="password" size="lg" isRequired="required" />
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <argon-switch id="rememberMe">Remember me</argon-switch>
                      </div>
                      <div class="col-6">
                        <a href="https://www.google.com">
                          <p class="mb-0 float-end">Lupa kata sandi?</p>
                        </a>
                      </div>
                    </div>
                    <div class="text-center">
                      <router-link to="/dashboard-default" tag="button">
                        <span>
                          <argon-button size="lg mt-3" color="primary" fullWidth>
                            Sign In
                          </argon-button>
                        </span>
                      </router-link>
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
                <img src="../assets/img/img-login.png">
                <span class="mask bg-gradient-success opacity-1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
