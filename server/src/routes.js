const MovieController = require('./controllers/MovieController')

module.exports = (app) => {
  app.get('/movies',
    MovieController.fetch)
  app.get('/movies/:movieId',
    MovieController.singleFetch)
  app.post('/movies',
    MovieController.create)
}