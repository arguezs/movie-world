import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
// import titleMixin from './mixins/titleMixin'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Vuelidate)
// Vue.mixin(titleMixin)

router.beforeEach((to, from, next) => {
  store.commit('updateUser')
  document.title = to.meta.title ? `${to.meta.title} | Movie World` : 'Movie World'
  next()
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
