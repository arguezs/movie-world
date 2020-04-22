<template>
  <v-container>
    <h1>Sesiones</h1>
    <v-row>
      <v-col>
        <h2>Día</h2>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Día"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
            @click:date="$refs.menu.save(date)"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <h2>Sala</h2>
        <v-select
          label="Sala"
          v-model="theater"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TheaterService from '@/services/TheaterService'

export default {
  data () {
    return {
      sessions: [],
      date: null,
      theater: null,
      theaters: []
    }
  },
  async mounted () {
    this.theaters = (await TheaterService.fetchTheaters()).data
  }
}
</script>

<style>

</style>