import Vue from 'vue'
import VueRouter from 'vue-router'

import SessionService from '@/services/SessionService'

import Home from '../views/Home.vue'
import SingleMovie from '@/views/SingleMovie'
import UserProfile from '@/views/UserProfile'
import Transaction from '@/views/Transaction'

import ParentView from '@/views/ParentView'

import Login from '@/views/Session/Login'
import Register from '@/views/Session/Register'
import PasswordRecovery from '@/views/Session/PasswordRecovery'
import PasswordRestore from '@/views/Session/PasswordRestore'

import MovieStats from '@/views/AdminZone/MovieStats'
import Sessions from '@/views/AdminZone/Sessions'
import Movies from '@/views/AdminZone/Movies'
import UserList from '@/views/AdminZone/UserList'
import TransactionList from '@/views/AdminZone/TransactionList'

import ErrorPage from '@/views/ErrorPage'

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
    meta: {title: 'Compra tus entradas'},
    beforeEnter (to, from, next) {
      SessionService.isAvailable(to.params.sessionId)
        .then(result => {
          if (result.data)
            next()
          else
            next({name: 'Error page', params: {errorCode: 404}})
        })
        .catch(() => { next({name: 'Error page', params: {errorCode: 500}}) })
    }
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
      },
      {
        path: 'recovery',
        name: 'Password Recovery',
        component: PasswordRecovery,
        meta: {title: 'Recuperar contraseña'}
      },
      {
        path: 'recovery/:recoveryCode',
        name: 'Password Restore',
        component: PasswordRestore,
        meta: {title: 'Reestablecer contraseña'}
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
        next({name: 'Error page', params: {errorCode: 401}})
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
        meta: {title: 'Películas'}
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
  },
  {
    path: '/error/:errorCode',
    name: 'Error page',
    component: ErrorPage
  }
]

export default new VueRouter({ routes })
