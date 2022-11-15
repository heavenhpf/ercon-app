<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" v-bind="$attrs"
    id="navbarBlur" data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <!-- <breadcrumbs :currentPage="currentRouteName" textWhite="text-dark" /> -->
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" id="navbar">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <ul class="navbar-nav justify-content-end">
            <li class="nav-item d-flex align-items-center">
              <Profile />
            </li>
            <!-- <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="#" @click="toggleSidebar" class="p-0 nav-link text-dark" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li> -->
            <li class="px-3 nav-item d-flex align-items-center">
              <a class="p-0 nav-link text-dark" @click="toggleConfigurator">
                <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
              </a>
            </li>
            <li class="nav-item dropdown d-flex align-items-center pe-2">
              <Notification />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import Profile from '@/examples/Navbars/Profile.vue';
import Notification from '@/examples/Navbars/Notification.vue';

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
  },
  components: {
    Breadcrumbs,
    Profile,
    Notification,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>