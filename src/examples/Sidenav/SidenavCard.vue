<template>
  <div
    v-show="this.$store.state.layout !== 'landing'"
    class="card card-plain shadow-none"
    id="sidenavCard"
  >
  </div>
</template>
<script>
  
export default {
  name: "sidenav-card",
};
</script>
