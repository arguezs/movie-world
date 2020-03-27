const {Movie} = require('../models')

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
  }
}