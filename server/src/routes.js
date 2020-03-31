const MovieController = require('./controllers/MovieController')
const SessionController = require('./controllers/SessionController')
const SeatController = require('./controllers/SeatController')

module.exports = (app) => {
  app.get('/movies',
    MovieController.fetch)
  app.get('/movies/:movieId',
    MovieController.singleFetch)
  app.post('/movies',
    MovieController.create)

  app.get('/session/:movieId',
    SessionController.fetch)
  app.get('/session/seats/:sessionId',
    SessionController.fetchSessionSeat)
  app.post('/session',
    SessionController.create)

  app.get('/seats/:theaterId',
    SeatController.fetchTheater)
}