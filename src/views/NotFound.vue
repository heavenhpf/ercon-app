<template>
  <!-- Header -->
  <div class="header py-7 py-lg-8 pt-lg-9">
    <div class="container">
      <div class="header-body text-center mb-7">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-lg-6 col-md-8 px-5">
            <h1 class="text-primary">404</h1>
            <p class="text-lead text-dark">Page not found. Pastikan laman yang Anda tuju sesuai.</p>

            <router-link :to="{ name: 'Default' }" class="font-weight-bold text-dark mt-5">Kembali ke dashboard</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: () => ({
    title: 'Not Found',
  }),
};
</script>
