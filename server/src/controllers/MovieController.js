const {Movie, Session, sequelize} = require('../models')
const Sequelize = require('sequelize')

module.exports = {
  async create (req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.send(movie)
    } catch (error) {
      res.status(500).send({
        error: 'Se ha producido un error al añadir la película'
      })
    }
  },
  async read (req, res) {
    try {
      const movie = await Movie.findByPk(req.params.movieId)
      res.send(movie)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async update (req, res) {
    try {
      const movie = await Movie.findByPk(req.params.movieId)
      const updatedMovie = req.body

      movie.title = updatedMovie.title
      movie.duration = updatedMovie.duration
      movie.year = updatedMovie.year
      movie.rating = updatedMovie.rating
      movie.trailer = updatedMovie.trailer
      movie.poster = updatedMovie.poster
      movie.director = updatedMovie.director
      movie.cast = updatedMovie.cast
      movie.genre = updatedMovie.genre

      await movie.save()
      await movie.reload()
      
      res.send(movie)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async delete (req, res) {
    try {
      const movie = await Movie.findByPk(req.params.movieId)

      await movie.delete()
    } catch (error){
      res.status(500).send({
        error: error
      })
    }
  },
  async fetch (req, res) {
    try {
      const movies = await Movie.findAll({
        order: [['title', 'ASC']]
      })
      res.send(movies)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async fetchTodayListing (req, res) {
    try {
      const today = new Date(Date.now())
      
      const listing = await Movie.findAll({
        include: [{
          model: Session,
          where: {
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            MovieId: Sequelize.col('Movie.id')
          }
        }]
      })
      res.send(listing)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async fetchNextReleases (req, res) {
    try {
      const today = new Date(Date.now())
      const todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

      const nextReleases = await sequelize.query(`SELECT movie.* FROM movies AS movie
      INNER JOIN sessions ON sessions.MovieId = movie.id
      WHERE sessions.date IN (SELECT min(date) FROM sessions GROUP BY MovieId)
      AND sessions.date > '${todayString}'`, {type: Sequelize.QueryTypes.SELECT})

      res.send(nextReleases)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  }
}