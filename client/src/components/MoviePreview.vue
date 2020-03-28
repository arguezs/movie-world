<template>
  <v-card
    width="200">
    <v-img
      class="white--text align-end"
      height="300px"
      :src="movie.poster">
    </v-img>
    <v-btn
      text
      block
      :to="{name:'SingleMovie', params: {movieId: movie.id}}">{{movie.title}}</v-btn>
  </v-card>
</template>

<script>
export default {
    props: {
        movie: {}
    }
}
</script>

<style scoped>
.text-truncate{
  max-width: 200px;
}
</style>