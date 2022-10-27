<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="pb-0 text-start mb-3">
            <h5 class="text-dark">{{ status }}</h5>
            <h4 class="font-weight-bolder text-dark">{{ g$name.name }}</h4>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card :title="stats.po.title" :value="g$countPO" :iconClass="stats.po.iconClass"
              :iconBackground="stats.po.iconBackground" directionReverse></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card :title="stats.dn.title" :value="g$countDN" :iconClass="stats.dn.iconClass"
              :iconBackground="stats.dn.iconBackground" directionReverse></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card :title="stats.supplier.title" :value="g$count" :iconClass="stats.supplier.iconClass"
              :iconBackground="stats.supplier.iconBackground" directionReverse></card>
          </div>
          <div class="mb-5">
            <doughnut-tracking-chart />
          </div>
          <div class="mb-5">
            <div class="pb-0 row">
              <div class="row mb-0">
                <div class="col-10">
                  <div class="pb-0 text-start">
                    <h5 class="text-black font-weight-bolder">Deadline PO Terdekat</h5>
                  </div>
                </div>
                <div class="col-2 d-flex justify-content-end mt-1">
                  <div class="pb-0 text-start">
                    <router-link to="/dashboard/tracking-saya" tag="button">
                      <span>
                        <p class="text-primary font-weight-bolder">Lihat Semua</p>
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <tracking-table />
            </div>
          </div>
          <div class="mb-5">
            <div class="pb-0 row">
              <div class="row mb-0">
                <div class="col-10">
                  <div class="pb-0 text-start">
                    <h5 class="text-black font-weight-bolder">PO Selesai Terbaru</h5>
                  </div>
                </div>
                <div class="col-2 d-flex justify-content-end mt-1">
                  <div class="pb-0 text-start">
                    <router-link to="/dashboard/tracking-saya" tag="button">
                      <span>
                        <p class="text-primary font-weight-bolder">Lihat Semua</p>
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- mengambil dari store po -->
            <div>
              <tracking-table />
            </div>
          </div>
          <div class="pb-0 row">
            <div class="pb-0 text-start mb-2">
              <h5 class="text-black font-weight-bolder">History Monitoring</h5>
            </div>
          </div>

          <!-- mengambil dari store item-->
          <div>
            <MonitoringTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import DoughnutTrackingChart from "@/examples/Charts/DoughnutTrackingChart.vue";
import Carousel from "@/components/examples/Carousel.vue";
import CategoriesCard from "@/components/examples/CategoriesCard.vue";
import TrackingTable from "@/components/examples/TrackingTable.vue";
import MonitoringTable from "@/components/examples/MonitoringTable.vue";
import { baseApi } from '@/utils/axios';
import d$company from '@/stores/dashboard/company';
import d$dashboard from '@/stores/dashboard/dashboard';
import { mapActions, mapState } from "pinia";


const date = new Date;
let hours = date.getHours();
let status = "";
if (hours >= 5 && hours < 12) {
  status = "Selamat Pagi"
} else if (hours >= 12 && hours < 15) {
  status = "Selamat Siang"
} else if (hours >= 15 && hours < 18) {
  status = "Selamat Sore"
} else {
  status = "Selamat Malam"
}

export default {
  name: "default",
  data() {
    return {
      posts: '',
      errors: [],
      status,
      stats: {
        po: {
          title: "Purchasing Order",
          iconClass: "ni ni-basket",
          iconBackground: "bg-info",
        },
        dn: {
          title: "Delivery Note",
          iconClass: "ni ni-delivery-fast",
          iconBackground: "bg-info",
        },
        supplier: {
          title: "Supplier",
          iconClass: "ni ni-single-02",
          iconBackground: "bg-info",
        },
      },
    };
  },
  components: {
    Card,
    GradientLineChart,
    DoughnutTrackingChart,
    TrackingTable,
    MonitoringTable,
    Carousel,
    CategoriesCard,
  },

  // created() {
  //   baseApi.get(`/users/username`)
  //     .then(response => {
  //       // JSON responses are automatically parsed.
  //       this.posts = response.data
  //       console.log(this.posts)
  //     })
  //     .catch(e => {
  //       this.errors.push(e)
  //     })
  // },
  async created() {
    try {
      const { data } = await baseApi.get(`/companies/name`);
      this.posts = data.name;
    } catch (e) {
      console.error(e);
    }
  },

  computed: {
    ...mapState(d$company, ['g$name']),
    ...mapState(d$dashboard, ['g$count', 'g$countDN', 'g$countPO']),
  },
  methods: {
    ...mapActions(d$company, ['a$name']),
    ...mapActions(d$dashboard, ['a$countSupplier', 'a$countDN', 'a$countPO']),
  },
  async mounted() {
    try {
      await this.a$name();
      await this.a$countSupplier();
      await this.a$countDN();
      await this.a$countPO();
    } catch (e) {
    }
  }
};
</script>