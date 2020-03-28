const {Theater} = require('../models')

module.exports = {
  async fetch (req, res) {
    try {
      const theaters = await Theater.findAll()
      res.send(theaters)
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  }
}