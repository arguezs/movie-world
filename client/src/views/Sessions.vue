<template>
  <v-container>
    <h1>Sesiones</h1>
    <v-row>
      <v-col>
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
        <v-select
          label="Sala"
          :items="theaters"
          item-text="name"
          item-value="id"
          v-model="theater"></v-select>
      </v-col>
    </v-row>

    <v-row
      v-if="theater && date">
      <v-container
        v-if="sessions.length">
        <session-preview
          v-for="session in sessions"
          :key="session.id"
          :session="session" />
      </v-container>
      <v-container
        v-else>
        No se han encontrado sesiones
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import SessionPreview from '@/components/SessionPreview'
import SessionService from '@/services/SessionService'
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
  components: { SessionPreview },
  async mounted () {
    this.theaters = (await TheaterService.fetchTheaters()).data
  },
  watch: {
    date: async function () {
      if (this.theater) {
        this.sessions = (await SessionService.fetchWithDayAndTheater(this.date, this.theater)).data
      }
    },
    theater: async function () {
      if (this.date) {
        this.sessions = (await SessionService.fetchWithDayAndTheater(this.date, this.theater)).data
      }
    }
  }
}
</script>

<style>

</style>