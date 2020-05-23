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
import UserList from '@/views/AdminZone/UserList'
import TransactionList from '@/views/AdminZone/TransactionList'

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
    component: SingleMovie,
    meta: {title: 'Película'}
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: UserProfile,
    meta: {title: 'Perfil'}
  },
  {
    path:'/buy/:sessionId/',
    name: 'Transaction',
    component: Transaction,
    meta: {title: 'Compra tus entradas'}
  },
  {
    path: '/session',
    component: ParentView,
    beforeEnter (to, from, next) {
      if (store.getters.isAuthenticated)
        next('/')
      else
        next ()
    },
    children: [
      {
        path: 'sign-in',
        name: 'Login',
        component: Login,
        meta: {title: 'Iniciar sesión'}
      },
      {
        path: 'sign-up',
        name: 'Register',
        component: Register,
        meta: {title: 'Registro'}
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
        component: MovieStats,
        meta: {title: 'Estadísticas'}
      },
      {
        path: 'sessions',
        name: 'Sessions',
        component: Sessions,
        meta: {title: 'Sesiones'}
      },
      {
        path: 'movies',
        name: 'Movies',
        component: Movies,
        meta: {title: 'Películas'},
        children: [{
          path: 'add',
          name: 'AddMovie',
          component: AddMovie,
          meta: {title: 'Añadir película'}
        }]
      },
      {
        path: 'users',
        name: 'User List',
        component: UserList,
        meta:{title: 'Lista de usuarios'}
      },
      {
        path: 'transactions',
        name: 'Transaction List',
        component: TransactionList,
        meta: {title: 'Lista de transacciones'}
      }
    ]
  }
]

export default new VueRouter({ routes })
