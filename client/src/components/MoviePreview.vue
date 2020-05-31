<template>

  <v-hover>
    <template v-slot="{ hover }">
      <v-card width="200">
        <v-img
          class="white--text align-end"
          height="300px"
          :src="`http://localhost:8081/${movie.poster}`" />

        <v-fade-transition>
          <v-overlay v-if="hover" absolute>
            <v-btn text small
              :to="{name:'SingleMovie', params: {movieId: movie.id}}">
              <span class="text-truncate">{{movie.title}}</span>
            </v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
  
</template>

<script>
export default {
    props: {
        movie: {}
    }
}
</script>

<style scoped>
.text-truncate{max-width: 200px;}
</style>
