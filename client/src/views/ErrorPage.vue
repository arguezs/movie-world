<template>
  <v-container class="text-center">
    <div class="display-4 mt-12">{{ errorCode }}</div>
    <div class="subtitle-1 mb-6">{{ errorMsg }}</div>
    <router-link to="/" class="caption">Volver al inicio</router-link>
  </v-container>
</template>

<script>
export default {
  computed: {
    errorCode () {
      return parseInt(this.$route.params.errorCode) || 0
    },
    errorMsg () {
      switch (this.errorCode) {
        case 401:
          return 'Unauthorized'
        case 404:
          return 'Not found'
        case 500:
          return 'Internal server error'
        default:
          return 'Unknown error'
      }
    }
  }
}
</script>

<style>

</style>