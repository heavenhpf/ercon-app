<template>
  <div class="card pb-4">
    <div class="p-3 pb-0 card-header">
      <div class="d-flex align-items-center">
        <button type="button"
          class="mb-0 btn btn-icon-only btn-rounded btn-outline-secondary ms-2 btn-sm d-flex align-items-center justify-content-center ms-auto"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Rekaplitulasi Total Purchasing Order (PO)">
          <i class="fas fa-info"></i>
        </button>
      </div>
    </div>
    <div class="p-3 card-body">
      <div class="row">
        <div class="text-center col-5">
          <div class="chart">
            <canvas id="chart-consumption" class="chart-canvas" height="197"></canvas>
          </div>
          <h4 class="font-weight-bold mt-n8">
            <span>{{ g$countPO }}</span>
            <span class="text-sm d-block text-body">Total Purchasing Order</span>
          </h4>
        </div>
        <div class="col-7">
          <h5 class="mb-0">Rekap PO Saya</h5>
          <div class="table-responsive">
            <table class="table mt-3 mb-0 align-items-center">
              <tbody>
                <tr>
                  <td>
                    <div class="px-2 py-1 d-flex">
                      <span class="badge bg-info me-3">&nbsp;</span>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Sedang Diproses</h6>
                      </div>
                    </div>
                  </td>
                  <td class="text-sm text-center align-middle">
                    <span class="text-sm font-weight-bold">{{ (g$countStatus.progress / (g$countStatus.progress +
                        g$countStatus.deadline + g$countStatus.done) * 100).toFixed(1)
                    }} %</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="px-2 py-1 d-flex">
                      <span class="badge bg-danger me-3">&nbsp;</span>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Melewati Deadline</h6>
                      </div>
                    </div>
                  </td>
                  <td class="text-sm text-center align-middle">
                    <span class="text-sm font-weight-bold">{{ (g$countStatus.deadline / (g$countStatus.progress +
                        g$countStatus.deadline + g$countStatus.done) * 100).toFixed(1)
                    }} %</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="px-2 py-1 d-flex">
                      <span class="badge bg-success me-3">&nbsp;</span>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Progress Selesai</h6>
                      </div>
                    </div>
                  </td>
                  <td class="text-sm text-center align-middle">
                    <span class="text-sm font-weight-bold">{{ (g$countStatus.done / (g$countStatus.progress +
                        g$countStatus.deadline + g$countStatus.done) * 100).toFixed(1)
                    }} %</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import d$dashboard from '@/stores/dashboard/dashboard';
import { mapActions, mapState } from "pinia";

export default {
  name: "doughnut-tracking-chart",
  computed: {
    ...mapState(d$dashboard, ['g$countPO', 'g$countStatus']),
  },
  methods: {
    ...mapActions(d$dashboard, ['a$countPO', 'a$countStatus']),
    renderChart() {
      const ctx1 = document.getElementById("chart-consumption").getContext("2d");

      const label = Object.keys(this.g$countStatus);
      const data = Object.values(this.g$countStatus);

      new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: label,
          datasets: [
            {
              label: "Consumption",
              weight: 9,
              cutout: 90,
              tension: 0.9,
              pointRadius: 2,
              borderWidth: 0,
              backgroundColor: [
                "#11cdef",
                "#f5365c",
                "#2dce89",
              ],

              data: data,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: false,
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    },
  },
  async mounted() {
    try {
      await this.a$countPO();
      await this.a$countStatus();
    } catch (e) {
    }
  },
  watch: {
    g$countStatus(val) {
      this.renderChart();
    }
  }
};
</script>