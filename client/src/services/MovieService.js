import Api from './Api'

export default {
  fetch () {
    return Api().get('movies')
  },
  post (movie) {
    return Api().post('movies', movie)
  }
}