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
            movies: [
                {
                    id: 1,
                    title: 'Onward',
                    poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRz-fNS2DjNUMTtC9HIhP6haHeMzjjKZVeaII0Rl3yeiKEhZmB0'
                }
            ]
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
