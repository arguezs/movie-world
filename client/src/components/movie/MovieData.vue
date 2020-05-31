<template>
  <v-card outlined class="my-6">
    <v-row dense>
      <v-col>
        <v-card-title>{{movie.title}}</v-card-title>

        <v-card-subtitle> {{movie.year}} - {{movie.duration}} min - {{movie.director}} - {{movie.genre}} </v-card-subtitle>

        <v-card-text>{{movie.sinopsis}}</v-card-text>

        <v-card-text>
          <div class="overline">Reparto</div>
          {{movie.cast}}
        </v-card-text>
      </v-col>

      <v-col cols="auto">
        <v-img
          class="ma-2"
          max-height="300px"
          max-width="250px"
          contain
          :src="`http://localhost:8081/${movie.poster}`"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: { movie: Object }
}
</script>