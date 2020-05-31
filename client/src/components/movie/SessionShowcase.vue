<template>
  <v-card outlined class="my-6">

    <v-card-title>Sesiones</v-card-title>

    <v-card-text v-if="filteredSessions.length">
      <v-row>
        <v-col cols="6" v-for="day in filteredSessions" :key="day.date">
          <v-row>
            <v-col>{{day.date}}</v-col>
          </v-row>
          <v-row>
            <v-col v-for="session in day.sessions" :key="session.id" cols="auto" class="text-center">
              <session-chip :session="session" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text v-else class="subtitle-1">
      No hay sesiones disponibles
    </v-card-text>

  </v-card>
</template>

<script>
import SessionChip from './SessionChip'

export default {
  props: { sessions: Array },
  components: { SessionChip },
  computed: {
    filteredSessions () {
      return this.sessions.filter(day => day.sessions.length > 0)
    }
  }
}
</script>