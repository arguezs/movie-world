const {Session, Seat} = require('../models')

module.exports = {
  async fetchAll (req, res) {
    try {
      console.log(req.body)
      const sessions = await Session.findAll({
        where: {
          movieId: req.params.movieId
        },
        order: [['date']]
      })
      res.send(sessions)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async create (req, res) {
    try {
      const session = await Session.create(req.body)
      res.send(session)
    } catch (error) {
      res.status(500).send({
        error: 'Se ha producido un error al añadir la sesión'
      })
    }
  },
  async fetchSessionSeat(req, res) {
    try {
      const session = await Session.findByPk(req.params.sessionId),
            seats = await session.getSeats()
      res.send(seats)
    } catch (error) {
      res.status(500).send({
        error: 'Se ha producido un error'
      })
    }
  },
  async addSessionSeats(req, res) {
    try {
      const session = await Session.findByPk(req.params.sessionId)
      let seats = req.body

      for (let seat of seats) {
        seat = await Seat.findByPk(seat)
      }

      const addedSeats = await session.addSeats(seats)

      res.send(addedSeats)
    } catch (error) {
      res.status(500).send({
        error: 'Se ha producido un error'
      })
    }
  }
}