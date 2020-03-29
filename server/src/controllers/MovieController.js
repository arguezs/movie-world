const {Movie} = require('../models')

module.exports = {
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
  async singleFetch (req, res){
    try {
      console.log(req.params.movieId)
      const movie = await Movie.findByPk(req.params.movieId)
      res.send(movie)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async create (req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.send(movie)
    } catch (error) {
      res.status(500).send({
        error: 'Se ha producido un error al añadir la película'
      })
    }
  }
}