const MovieController = require('./controllers/MovieController')
const SessionController = require('./controllers/SessionController')

module.exports = (app) => {
  app.get('/movies',
    MovieController.fetch)
  app.get('/movies/:movieId',
    MovieController.singleFetch)
  app.post('/movies',
    MovieController.create)

  app.get('/session/:movieId',
    SessionController.fetch)
  app.post('/session',
    SessionController.create)
}