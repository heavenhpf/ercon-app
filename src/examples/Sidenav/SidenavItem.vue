<template>
  <router-link :to="url" class="nav-link" v-bind="$attrs" :exact="true">
    <div class="icon icon-shape icon-sm  text-center d-flex align-items-center justify-content-center">
      <slot name="icon"></slot>
    </div>
    <span :class="`${this.$store.state.isRTL ? 'nav-link-text ms-1': 'nav-link-text ms-1  d-none'}`">{{ navText }}</span>
  </router-link>
</template>
<script>
export default {
  name: "sidenav-item",
  props: {
    url: {
      type: String,
      required: true
    },
    navText: {
      type: String,
      required: true
    }
  }
};
</script>