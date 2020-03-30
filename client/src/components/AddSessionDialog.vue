<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="600">

    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-on="on">
        <v-icon left>add</v-icon> Añadir
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Añadir sesión</v-card-title>

      <v-card-text
        class="text-center">
        <v-row>
          <v-col>
            <v-text-field
              v-model="session.theaterId"
              type="number"
              min="1"
              max="13"
              label="Sala"></v-text-field>
            <!-- <v-select
              v-model="session.theaterId"
              label="Sala"
              :items="theaters"></v-select> -->
          </v-col>
        </v-row>
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
            <v-menu
              ref="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Hora"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                format="24hr"
                v-model="time"
                @click:minute="$refs.menu2.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row
          v-if="error"
          align="space-between">
          <v-col class="red--text">{{error}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="dialog = false">Cerrar</v-btn>
        <v-btn
          color="primary"
          text
          @click="newSession">Añadir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SessionService from '@/services/SessionService'

export default {
  data () {
    return {
      dialog: false,
      session: {
        date: '',
        theaterId: '',
        movieId: ''
      },
      theaters: [],
      date: '',
      time: '',
      error: null
    }
  },
  props: {
    movie: {}
  },
  watch: {
    date: function (val) {
      this.session.date = `${val} ${this.time}`
    },
    time: function (val) {
      this.session.date = `${this.date} ${val}`
    },
    movie: function (val) {
      this.session.movieId = val.id
    }
  },
  methods: {
    async newSession () {
      this.error = null

      try {
        await SessionService.post(this.session)

        this.dialog = false
        this.date = ''
        this.time = ''
        this.session.theaterId = ''
      } catch (error) { 
        this.error = "Error al crear la sesión"
      }
    }
  }
}
</script>
  
<style>

</style>