<template>
  <v-card
    width="200">
    <v-img
      class="white--text align-end"
      height="300px"
      :src="`http://localhost:8081/${movie.poster}`" />
    <v-btn
      small
      text
      block
      :to="{name:'SingleMovie', params: {movieId: movie.id}}">
      <span class="text-truncate">{{movie.title}}</span>
    </v-btn>
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