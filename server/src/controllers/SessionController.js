const {Session} = require('../models')

module.exports = {
  async fetch (req, res) {
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
  }
}