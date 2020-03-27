<template>
  <div>
      <movie-preview v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MoviePreview from '@/components/MoviePreview'
import MovieService from '@/services/MovieService'

export default {
    data () {
        return {
            movies: []
        }
    },
    components: { MoviePreview },
    async mounted () {
        this.movies = (await MovieService.fetch()).data
    }
}
</script>

<style>

</style>
