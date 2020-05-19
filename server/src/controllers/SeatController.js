const {Seat, Transaction} = require('../models')

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
  },
  async fetchTheater (req, res) {
    try {
      const rowCount = (await Seat.count({
        where: {
          theaterId: req.params.theaterId
        },
        group: 'row'
      })).length

      let rows = []

      for (let i=1; i<=rowCount; i++) {
        rows.push(await Seat.findAll({
          where: {
            theaterId: req.params.theaterId,
            row: i
          }
        }))
      }

      res.send(rows)

    } catch (error) {
      res.status(500).send({
        error: 'Se ha producido un error'
      })
    }
  },

  fetchUnavailableSeats (req, res) {
    Seat.findAll({
      where: {
        '$Transactions.SessionId$': req.params.sessionId
      },
      include: [{
        model: Transaction,
        required: true
      }]
    })
      .then(seats => {
        res.send(seats)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  }
}