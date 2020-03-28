const {Seat} = require('../models')

module.exports = {
  async fetch (req, res) {
    try {
      const seats = await Seat.findAll({
        where: {
          theaterId: req.params.movieId
        }
      })
      res.send(seats)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  }
}