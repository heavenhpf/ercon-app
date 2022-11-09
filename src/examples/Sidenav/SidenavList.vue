<template>
  <div class="collapse zindex-0 navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav ">
      <li class="nav-item">
        <sidenav-item url="/dashboard" :class="getRoute() === 'default' ? 'active' : ''" navText="Dashboard">
          <template v-slot:icon>
            <i class="fa fa-home mb-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-uppercase text-xs ps-4 font-weight-bolder ms-2">
          Tracking
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item url="/tracking/tracking-saya" :class="getRoute() === 'tracking-saya' ? 'active' : ''"
          navText="Tracking Saya">
          <template v-slot:icon>
            <i class="fa fa-paper-plane-o mb-2 text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/tracking/tracking-tier-bawah" :class="getRoute() === 'tracking-tier-bawah' ? 'active' : ''"
          navText="Tracking Tier Bawah">
          <template v-slot:icon>
            <i class="fa fa-archive mb-2 text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <template v-if="this.g$user.role === 1 && 2">
        <li class="nav-item">
          <sidenav-item url="/tracking/pesanan-masuk" :class="getRoute() === 'pesanan-masuk' ? 'active' : ''"
            navText="Pesanan Masuk">
            <template v-slot:icon>
              <i class="fa fa-tasks mb-2 text-success text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>
      <li class="mt-3 nav-item">
        <h6 class="text-uppercase text-xs ps-4 font-weight-bolder ms-2">
          Monitoring
        </h6>
      </li>
      <template v-if="this.g$user.role === 1 && 2">
        <li class="nav-item">
          <sidenav-item url="/monitoring/gudang-saya" :class="getRoute() === 'gudang-saya' ? 'active' : ''"
            navText="Gudang Saya">
            <template v-slot:icon>
              <i class="ni ni-box-2 text-warning text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>
      <li class="nav-item">
        <sidenav-item url="/monitoring/monitoring-item" :class="getRoute() === 'monitoring-item' ? 'active' : ''"
          navText="Monitoring Item">
          <template v-slot:icon>
            <i class="ni ni-ui-04 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-uppercase text-xs ps-4 font-weight-bolder ms-2">
          Purchasing Order (PO)
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item url="/po/ajukan-po" :class="getRoute() === 'ajukan-po' ? 'active' : ''" navText="Ajukan PO">
          <template v-slot:icon>
            <i class="ni ni-tag text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-uppercase text-xs ps-4 font-weight-bolder ms-2">
          Manajemen Akun
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item url="/akun/company-saya" :class="getRoute() === 'company-saya' ? 'active' : ''"
          navText="Perusahaan Saya">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <template v-if="this.g$user.role === 0">
        <li class="nav-item">
          <sidenav-item url="/akun/company" :class="getRoute() === 'company' ? 'active' : ''" navText="List Perusahaan">
            <template v-slot:icon>
              <i class="fa fa-users mb-1 text-dark text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card :class="cardBg" textPrimary="Need Help?" textSecondary="Please check our docs" />
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import ArgonRadio from "@/components/ArgonRadio.vue";
import d$auth from '@/stores/auth.d';
import { mapActions, mapState } from 'pinia';

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
    ArgonRadio,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  },

  computed: {
    ...mapState(d$auth, ['g$user']),
  }
};
</script>