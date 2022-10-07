<template>
    <div class="mb-4 card" :class="cardBackground">
      <div class="p-4 card-body">
        <div class="d-flex">
          <div :class="contentClass">
            <div class="numbers" v-if="this.$store.state.isRTL">
              <p class="mb-0 text-md text-white font-weight-bold" :class="titleColor">{{ title }}</p>
              <h2 class="text-white text-lg font-weight-bolder" :class="valueColor">{{ value }}
              <!-- <span class="text-sm"  :class="percentageColor">{{ percentage }}</span> 
              <span class="font-weight-light text-sm"> {{detail}}</span> -->
              </h2>
            </div>
            <div class="numbers" v-else>
              <p class="mb-0 text-md text-white font-weight-bold" :class="titleColor">{{ title }}</p>
              <h2 class="mb-0 text-white font-weight-bolder" :class="valueColor">{{ value }}</h2>
              <!-- <span class="text-sm"  :class="percentageColor">{{ percentage }}</span> 
                {{detail}} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "card2",
    data() {
      return {
        reverseDirection: "flex-row-reverse justify-content-between",
      };
    },
    props: {
      directionReverse: Boolean,
      title: {
        type: String,
        required: true,
      },
      detail: {
        type: String,
        required: true,
      },
      titleColor: {
        type: String,
      },
      value: {
        required: true,
      },
      valueColor: {
        type: String,
      },
      percentage: String,
      iconClass: {
        type: String,
        required: true,
      },
      percentageColor: {
        type: String,
        default: "text-success",
      },
      iconBackground: {
        type: String,
        default: "bg-black",
      },
      cardBackground: {
        type: String,
        default: "bg-white",
      },
      contentClass: {
        type: String,
      },
    },
  };
  </script>