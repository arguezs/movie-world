const MovieController = require('./controllers/MovieController')

module.exports = (app) => {
  app.get('/movies',
    MovieController.fetch)
  app.post('/movies',
    MovieController.create)
}