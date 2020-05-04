const MovieController = require('./controllers/MovieController')
const SessionController = require('./controllers/SessionController')
const SeatController = require('./controllers/SeatController')
const TheaterController = require('./controllers/TheaterController')

module.exports = (app) => {
  app.get('/movies',
    MovieController.fetch)

  app.post('/movies',
    MovieController.create)
  app.get('/movies/:movieId',
    MovieController.read)
  app.put('/movies/:movieId/update',
    MovieController.update)
  app.delete('/movie/:movieId',
    MovieController.delete)
  
  app.get('/movie-listing',
    MovieController.fetchTodayListing)
  app.get('/next-releases',
    MovieController.fetchNextReleases)

  app.get('/movies/:movieId/sessions',
    SessionController.fetchAll)
  app.get('/session/:sessionId',
    SessionController.fetchOne)
  app.get('/session/:sessionId/seats',
    SessionController.fetchSessionSeat)
  app.post('/session/:sessionId/seats',
    SessionController.addSessionSeats)
  app.post('/session',
    SessionController.create)
  app.delete('/session/:sessionId',
    SessionController.remove)

  app.get('/sessions/:date/:theaterId',
    SessionController.fetchWithDayAndTheater)

  app.get('/seats/:theaterId',
    SeatController.fetchTheater)

  app.get('/theaters',
    TheaterController.fetch)
}