import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Movies from '@/views/Movies'
import AddMovie from '@/views/AddMovie'
import SingleMovie from '@/views/SingleMovie'
import Theater from '@/views/Theater'
import Sessions from '@/views/Sessions'
import Login from '@/views/Login'
import UserProfile from '@/views/UserProfile'
import Transaction from '@/views/Transaction'
import MovieStats from '@/views/MovieStats'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/add',
    name: 'AddMovie',
    component: AddMovie
  },
  {
    path: '/movies/:movieId',
    name: 'SingleMovie',
    component: SingleMovie
  },
  {
    path: '/theater/:theaterId',
    name: 'Theater',
    component: Theater
  },
  {
    path: '/session/:sessionId',
    name: 'Session',
    component: Theater
  },
  {
    path: '/sessions',
    name: 'Sessions',
    component: Sessions
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
    path: '/admin/movie-stats',
    name: 'Movie Stats',
    component: MovieStats
  }
]

const router = new VueRouter({
  routes
})

export default router
