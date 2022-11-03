<template>
  <div class="card" :class="cardBackground">
    <div class="card-body p-2">
      <div class="row" :class="contentClass">
        <div :class="textPosition">
          <p class="mb-0 text-md text-white font-weight-bold" :class="titleColor">{{ title }}</p>
          <h2 class="mb-0 text-xxl text-white font-weight-bolder" :class="valueColor">{{ value }}</h2>
        </div>
        <div :class="iconPosition">
          <div class="text-center icon icon-shape">
            <i :class="iconClass" aria-hidden="true"></i>
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
    textPosition: {
      type: String,
    },
    iconPosition: {
      type: String,
    },
    iconClass: {
      type: String,
      required: true,
    },
  },
};
</script>