import Api from './Api'

export default {
  post (movie) {
    return Api().post('movies', movie)
  }
}