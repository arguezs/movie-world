<template>
  <v-card
    width="200">
    <v-img
      class="white--text align-end"
      height="300px"
      contain
      :src="movie.poster">
      <v-card-title>{{movie.title}}</v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
    props: {
        movie: {}
    }
}
</script>

<style>

</style>