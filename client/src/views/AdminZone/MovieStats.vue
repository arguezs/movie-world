<template>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="movies"
    :items-per-page="15"
    :loading="loadingState"
    loading-text="Cargando estadísticas..."
    :footer-props="footerProps" />
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'
import SessionService from '@/services/SessionService'

export default {
  data () {
    return {
      headers: [
        { text: 'Película', align: 'start', value: 'title' },
        { text: 'Sesiones', align: 'end', value: 'sessionCount' },
        { text: 'Recaudación', align: 'end', value: 'totalEarnings' }
      ],
      footerProps: {
        itemsPerPageText: 'Filas por página'
      },
      movies: [],
      loadingState: true
    }
  },
  mounted () {
    const vue = this

    MovieService.fetchMovieStats()
      .then(async stats => {
        stats = stats.data

        for (const movie of stats) {
          try {
            const earnings = (await SessionService.fetchTotalEarnings(movie.id)).data.totalEarnings

            movie.totalEarnings = (earnings ? parseFloat(earnings) : 0).toFixed(2) + ' €'
          } catch (error) { vue.error = error }
        }

        vue.movies = stats
      })
      .catch(error => {
        vue.error = error
      })
      .finally (() => { vue.loadingState = false })
  }
}
</script>