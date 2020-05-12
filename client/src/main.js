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
    user: null
  },
  mutations: {
    updateUser (state) {
      AuthenticationService.getUserData()
        .then(user => {
          state.user = user.data
        })
        .catch(() => {
          state.user = null
        })
    }
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
