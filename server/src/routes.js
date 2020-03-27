const MovieController = require('./controllers/MovieController')

module.exports = (app) => {
  app.post('/movies',
    MovieController.create)
}