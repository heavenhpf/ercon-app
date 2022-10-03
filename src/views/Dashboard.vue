<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="pb-0 text-start mb-3">
            <h5 class="text-white">Selamat Pagi,</h5>
            <h4 class="font-weight-bolder text-white">Admin PT TMMIN</h4>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card :title="stats.po.title" :value="stats.po.value" :iconClass="stats.po.iconClass"
              :iconBackground="stats.po.iconBackground" directionReverse></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card :title="stats.dn.title" :value="stats.dn.value" :iconClass="stats.dn.iconClass"
              :iconBackground="stats.dn.iconBackground" directionReverse></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card :title="stats.supplier.title" :value="stats.supplier.value" :iconClass="stats.supplier.iconClass"
              :iconBackground="stats.supplier.iconBackground" directionReverse></card>
          </div>
          <div class="mb-5">
            <doughnut-tracking-chart />
          </div>
          <div class="pb-0 row">
            <div class="row mb-0">
              <div class="col-10">
                <div class="pb-0 text-start">
                  <h5 class="text-black font-weight-bolder">Update Tracking</h5>
                </div>
              </div>
              <div class="col-2 d-flex justify-content-end mt-1">
                <div class="pb-0 text-start">
                  <p class="text-primary font-weight-bolder">Lihat Semua</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <tracking-table />
          </div>
          <div class="pb-0 row">
            <div class="pb-0 text-start mb-2">
              <h5 class="text-black font-weight-bolder">Item Monitoring</h5>
            </div>
            <div class="col-lg-4 col-md-3 mb-2">
                <span>
                    <div class="input-group">
                        <span class="input-group-text text-body">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                        <input type="text" class="form-control" :placeholder="
                        'Cari..'
                        " />
                    </div>
                </span>
            </div>
          </div>
          <div>
            <monitoring-table />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Sales by Country</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Country:</p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-card />
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
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import TrackingTable from "./components/TrackingTable.vue";
import MonitoringTable from "./components/MonitoringTable.vue";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-default",
  data() {
    return {
      stats: {
        po: {
          title: "Purchasing Order",
          value: "100",
          iconClass: "ni ni-basket",
          iconBackground: "bg-gradient-primary",
        },
        dn: {
          title: "Delivery Note",
          value: "100",
          iconClass: "ni ni-delivery-fast",
          iconBackground: "bg-gradient-danger",
        },
        supplier: {
          title: "Tier-1 Supplier",
          value: "5.373",
          iconClass: "ni ni-single-02",
          iconBackground: "bg-gradient-success",
        },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
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
};
</script>