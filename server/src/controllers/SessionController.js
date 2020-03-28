const {Session} = require('../models')

module.exports = {
  async fetch (req, res) {
    try {
      const sessions = await Session.findAll()
      res.send(sessions)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  }
}