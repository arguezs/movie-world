<template>
  <v-container>
    <movie-row :movies="currentListing">
      <v-banner slot="empty-message">
        No hay películas
      </v-banner>
    </movie-row>
  </v-container>
</template>

<script>
import MovieRow from '@/components/MovieRow'

export default {
  name: 'Home',
  data () {
    return {
      currentListing: [],
      nextReleases: []
    }
  },
  components: { MovieRow }
}
</script>
