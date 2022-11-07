<template>
  <div>
    <div v-show="this.$store.state.layout === 'default'" class="position-absolute w-100"
      :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-gray-100'}`" />
    <aside class="overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs" :class="`${this.$store.state.isRTL
      ? 'me-3 rotate-caret fixed-end'
      : 'fixed-start'
    } 
      ${this.$store.state.layout === 'landing'
      ? 'bg-transparent shadow-none'
      : ' '
    } ${this.$store.state.sidebarType}`" id="sidenav-main">
      <div class="sidenav-header mb-4">
        <i class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
          aria-hidden="true" id="iconSidenav"></i>
        <router-link class="m-0 navbar-brand" :to="{ name: 'Default' }">
          <div class="p-2 bg-white text-white rounded-pill">
            <img src="@/assets/img/ercon-logo.png" class="rounded mx-auto w-75 d-block m-0 w-60">
          </div>
        </router-link>
      </div>
      <sidenav-list :cardBg="custom_class" />
    </aside>
  </div>
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
  props: ["custom_class", "layout"]
};
</script>
