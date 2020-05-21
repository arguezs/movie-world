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
  update (req, res) {
    try {
      Movie.update(
        req.body,
        {
          where: {
            id: req.params.movieId
          }
        }
      ).then((updatedRows) => {
        res.send(updatedRows)
      })
    } catch (error) {
      res.status(500).send({error: error})
    }
  },
  delete (req, res) {
    try {
      Movie.delete({
        where: {
          id: req.params.movieId
        }
      }).then(() => {
        res.send(true)
      })
    } catch (error){
      res.status(500).send({error: error})
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
      WHERE movie.id IN (SELECT MovieId FROM sessions GROUP BY MovieId HAVING min(date) > '${todayString}')
      GROUP BY movie.id`, {type: Sequelize.QueryTypes.SELECT})

      res.send(nextReleases)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  fetchMovieStats (req, res) {
    Movie.findAll({
      attributes: ['id', 'title',
        [Sequelize.fn("COUNT", Sequelize.col("sessions.id")), "sessionCount"]
      ],
      include: [{ model: Session, attributes: [] }],
      group: ['id']
    })
      .then(movies => {
        res.send(movies)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  }
}