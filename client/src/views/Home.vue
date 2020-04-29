<template>
  <v-container>
    <movie-row :movies="currentListing">
      <span slot="row-title">Cartelera</span>
      <span slot="empty-message">No hay películas</span>
    </movie-row>

    <movie-row :movies="nextReleases">
      <span slot="row-title">Próximos estrenos</span>
      <span slot="empty-message">No hay próximos estrenos</span>
    </movie-row>
  </v-container>
</template>

<script>
import MovieRow from '@/components/MovieRow'

import MovieService from '@/services/MovieService'

export default {
  name: 'Home',
  data () {
    return {
      currentListing: [],
      nextReleases: []
    }
  },
  components: { MovieRow },
  async mounted () {
    this.currentListing = (await MovieService.fetchListing()).data
  }
}
</script>
