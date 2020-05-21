import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import SingleMovie from '@/views/SingleMovie'
import UserProfile from '@/views/UserProfile'
import Transaction from '@/views/Transaction'

import ParentView from '@/views/ParentView'

import Login from '@/views/Session/Login'
import Register from '@/views/Session/Register'

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
    path: '/movies/:movieId',
    name: 'SingleMovie',
    component: SingleMovie
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: UserProfile
  },
  {
    path:'/buy/:sessionId/',
    name: 'Transaction',
    component: Transaction
  },
  {
    path: '/session',
    component: ParentView,
    beforeEnter () {
      if (store.getters.isAuthenticated)
        next('/')
      else
        next ()
    },
    children: [
      {
        path: 'sign-in',
        name: 'Login',
        component: Login
      },
      {
        path: 'sign-up',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/admin',
    component: ParentView,
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
