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

    <v-container
      v-if="theater && date">

      <v-row
        v-if="sessions.length">
        <session-preview
          @resync-sessions="resyncSessions"
          v-for="session in sessions"
          :key="session.id"
          :session="session" />
      </v-row>

      <v-row v-else>
        <v-col>
          <v-banner
            single-line
            class="text-center">
            <v-icon
              color="error">
              error_outline
            </v-icon>

            No se han encontrado sesiones
          </v-banner>
        </v-col>
      </v-row>

      <v-row>
        <add-session
          @resync-sessions="resyncSessions"
          :date="date"
          :theater="theater" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import SessionPreview from '@/components/SessionPreview'
import AddSession from '@/components/AddSession'

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
  components: { SessionPreview, AddSession },
  async mounted () {
    this.theaters = (await TheaterService.fetchTheaters()).data
  },
  watch: {
    date: async function () {
      if (this.theater) {
        this.resyncSessions()
      }
    },
    theater: async function () {
      if (this.date) {
        this.resyncSessions()
      }
    }
  },
  methods: {
    async resyncSessions () {
      this.sessions = (await SessionService.fetchWithDayAndTheater(this.date, this.theater)).data
    }
  }
}
</script>

<style>

</style>