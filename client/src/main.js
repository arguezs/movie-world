import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Vuelidate)

router.beforeEach((to, from, next) => {
  store.commit('updateUser')
  next()
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
