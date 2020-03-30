import Api from './Api'

export default {
  post (session) {
    return Api().post('session', session)
  }
}