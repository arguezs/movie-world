import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

import AuthenticationService from '@/services/AuthenticationService'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueCookies)

const store = new Vuex.Store({
  state: {
    user: null,
    transaction: {
      price: 0,
      seats: []
    }
  },
  mutations: {
    updateUser (state) {
      AuthenticationService.getUserData()
        .then(user => {
          state.user = user.data.name ? user.data.name : user.data.mail
        })
        .catch(() => {
          state.user = null
        })
    },

    updatePrice (state, price) {
      state.transaction.price = price
    },

    addSeat (state, seat) {
      state.transaction.seats.push(seat)
    },

    removeSeat (state, id) {
      state.transaction.seats = state.transaction.seats.filter(seat => seat.id != id)
    }
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
