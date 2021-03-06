const MovieController = require('./controllers/MovieController')
const SessionController = require('./controllers/SessionController')
const SeatController = require('./controllers/SeatController')
const TheaterController = require('./controllers/TheaterController')
const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const TransactionController = require('./controllers/TransactionController')

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
    SessionController.fetchNextWeek)

  app.get('/session/:sessionId',
    SessionController.read)
  app.post('/session',
    SessionController.create)
  app.delete('/session/:sessionId',
    SessionController.delete)
  app.get('/session-data/:sessionId',
    SessionController.fetchSessionData)

  app.get('/session/:sessionId/seats',
    SeatController.fetchUnavailableSeats)
  app.post('/session/:sessionId/seats',
    SessionController.addSessionSeats)
  app.get('/session/:sessionId/available',
    SessionController.isAvailable)
  
  app.get('/sessions/:date/:theaterId',
    SessionController.fetchWithDayAndTheater)

  app.get('/seats/:theaterId',
    SeatController.fetchTheater)

  app.get('/theaters',
    TheaterController.fetch)

  app.post('/register',
    UserController.create)

  app.post('/login',
    AuthenticationController.login)
  app.get('/logout',
    AuthenticationController.logout)
  app.get('/user',
    AuthenticationController.authMiddleware,
    AuthenticationController.fetchUser)

  app.put('/user',
    UserController.updateProfile)
  app.get('/user-list',
    UserController.fetchAll)

  app.post('/transaction',
    TransactionController.create)
  app.get('/transaction/all',
    AuthenticationController.adminMiddleware,
    TransactionController.fetchAll)

  app.get('/movie-stats',
    MovieController.fetchMovieStats)
  app.get('/movie-stats/:movieId/earnings',
    SessionController.fetchMovieEarnings)

  app.delete('/user/:userId',
    AuthenticationController.adminMiddleware,
    UserController.delete)
  app.get('/user/:userId/make-admin',
    AuthenticationController.adminMiddleware,
    UserController.makeAdmin)

  app.post('/user/recovery/generate',
    UserController.createRecoveryCode)
  app.get('/user/recovery/check/:code',
    UserController.checkCodeValidity)
  app.post('/user/recovery/restore',
    UserController.restorePassword)
}