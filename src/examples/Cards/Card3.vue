<template>
  <div class="card" :class="cardBackground">
    <div class="card-body p-2">
      <div class="row" :class="contentClass">
        <div class="p-4 col-9">
          <p class="mb-0 text-md text-white font-weight-bold" :class="titleColor">{{ title }}</p>
          <h2 class="mb-0 text-xxl text-white font-weight-bolder" :class="valueColor">{{ value }}</h2>
        </div>
        <div class="p-1 col-3 mt-2">
          <div class="text-center icon icon-shape">
            <i class="fa-6x opacity-9" :class="iconClass" aria-hidden="true"></i>
          </div>
        </div>
        <!-- <span class="text-sm"  :class="percentageColor">{{ percentage }}</span> 
                {{detail}} -->
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "card3",
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
    iconClass: {
      type: String,
      required: true,
    },
  },
};
</script>