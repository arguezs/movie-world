import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import SingleMovie from '@/views/SingleMovie'
import Login from '@/views/Login'
import UserProfile from '@/views/UserProfile'
import Transaction from '@/views/Transaction'

import AdminZone from '@/views/AdminZone/AdminZone'
import MovieStats from '@/views/AdminZone/MovieStats'
import Sessions from '@/views/AdminZone/Sessions'
import Movies from '@/views/AdminZone/Movies'
import AddMovie from '@/views/AdminZone/AddMovie'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/movies/:movieId',
    name: 'SingleMovie',
    component: SingleMovie
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: UserProfile
  },
  {
    path:'/session/:sessionId/buy',
    name: 'Transaction',
    component: Transaction
  },
  {
    path: '/admin',
    name: 'Admin Zone',
    component: AdminZone,
    beforeEnter (to, from, next) {
      if (store.getters.isAdmin) {
        console.log('Entering Admin zone...')
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'movie-stats',
        name: 'Movie Stats',
        component: MovieStats
      },
      {
        path: 'sessions',
        name: 'Sessions',
        component: Sessions
      },
      {
        path: 'movies',
        name: 'Movies',
        component: Movies,
        children: [{
          path: 'add',
          name: 'AddMovie',
          component: AddMovie
        }]
      },
    ]
  }
]

export default new VueRouter({ routes })
