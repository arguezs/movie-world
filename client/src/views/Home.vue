<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>Carterlera</v-tab>
      <v-tab>Próximos estrenos</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <movie-row :movies="currentListing">
          <span slot="empty-message">No hay películas</span>
        </movie-row>
      </v-tab-item>
      
      <v-tab-item>
        <movie-row :movies="nextReleases">
          <span slot="empty-message">No hay próximos estrenos</span>
        </movie-row>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
</template>

<script>
import MovieRow from '@/components/MovieRow'

import MovieService from '@/services/MovieService'

export default {
  name: 'Home',
  data () {
    return {
      tab: null,
      currentListing: [],
      nextReleases: []
    }
  },
  components: { MovieRow },
  async mounted () {
    this.$store.commit('updateUser')
    this.currentListing = (await MovieService.fetchListing()).data
    this.nextReleases = (await MovieService.fetchNextReleases()).data
  }
}
</script>
