import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import transaction from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    route: null
  },
  modules: {
    user,
    transaction
  },
  mutations: {
    updateRoute (state, route) {
      state.route = route
    }
  }
})