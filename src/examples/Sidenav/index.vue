<template>
  <div v-show="this.$store.state.layout === 'default'" 
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-gray-100'}`" />
  <aside :class="`${this.$store.state.isRTL
    ? 'fixed overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs'
    : 'fixed-start overflow-auto border-0 w-lg-6 w-0 sidenav navbar navbar-vertical navbar-expand-xs responsive'
  } 
    ${this.$store.state.layout === 'landing'
    ? 'bg-transparent shadow-none'
    : ' '
  } ${this.$store.state.sidebarType}`" id="sidenav-main">
    <div class="sidenav-header mb-4">
      <i class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true" id="iconSidenav"></i>
      <div class="d-flex align-items-center">
        <router-link class="m-0 navbar-brand" :to="{ name: 'Default' }">
          <!-- <img
            :src="
              this.$store.state.darkMode ||
              this.$store.state.sidebarType === 'bg-default'
                ? logoWhite
                : logo
            "
            class="navbar-brand-img h-100"
            alt="main_logo"
          /> -->
          <div v-if="(this.$store.state.isRTL == true)" class="p-2 bg-white text-white rounded-pill ">
            <img src="@/assets/img/ercon-logo.png" class=" w-400 h-100 d-block m-0 w-100">
          </div>
        </router-link>
        <div class="pt-3 pe-4">
          <button type="button" @click="MinSidenav()" class="btn btn-default d-lg-none d-md-none"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
      </div>
      <router-link :to="{ name: 'Default' }">
        <img v-if="(this.$store.state.isRTL == false)" src="@/assets/img/ercon-icon.png" class="rounded mx-auto w-30 d-block m-0">
      </router-link>
    </div>
    <sidenav-list :cardBg="custom_class" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct-dark.png";
import logoWhite from "@/assets/img/logo-ct.png";

export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
      logoWhite
    };
  },
  methods: {
    MinSidenav() {
      this.$store.state.isRTL = false;
    }
  },
  props: ["custom_class", "layout"]
};
</script>