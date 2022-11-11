<template>
  <nav aria-label="breadcrumb">
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="`me-sm-6 ${this.$store.state.isNavFixed ? 'text-white' : 'text-dark' }`"
    >
      <li class="text-md breadcrumb-item">
        <a
          v-if="this.$store.state.isRTL"
          class="opacity-5 ps-2"
          href="#"
          :class="this.$store.state.isNavFixed ? 'text-white' : 'text-dark'"
          ></a
        >
        <a v-else 
        :class="this.$store.state.isNavFixed ? 'text-white' : 'text-dark'"
         class="opacity-9" href="#">Ercon</a>
      </li>
      <li
        class="text-md breadcrumb-item active"
        :class="this.$store.state.isNavFixed ? 'text-white' : 'text-dark'"
        aria-current="page"
      >
        {{ currentPage }}
      </li>
    </ol>

  </nav>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true
    },
    textWhite: {
      type: String
    }
  }
};
</script>