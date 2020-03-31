<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>
        Sala
      </v-toolbar-title>
    </v-toolbar>
    <theater-layout :seats="theater" />
  </v-container>
</template>

<script>
import TheaterLayout from '@/components/TheaterLayout'

import TheaterService from '@/services/TheaterService'

export default {
  data () {
    return {
      theater: []
    }
  },
  async mounted () {
    const theaterId = this.$route.params.theaterId
    this.theater = (await TheaterService.fetchTheater(theaterId)).data
  },
  components: { TheaterLayout }
}
</script>

<style>

</style>