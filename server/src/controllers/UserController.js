const {User} = require('../models')

module.exports = {
  create (req, res) {
    User.create(req.body)
      .then((user) => {
        res.send(user)
      },
      (error) => {
        res.status(500).send({error:error})
      })
  },
  read (req, res) {
    User.findByPk(req.params.userId)
      .then((user) => {
        res.send(user)
      },
      (error) => {
        res.status(500).send({error: error})
      })
  },
  update (req, res) {
    User.update(
      req.body,
      {
        where: {
          id: req.params.userId
        }
      }
    ).then((updatedRows) => {
      res.send(updatedRows)
    },
    (error) => {
      res.status(500).send({error: error})
    })
  },
  delete (req, res) {
    User.delete({
      where: {
        id: req.params.userId
      }
    }).then(() => {
      res.send(true)
    },
    (error) => {
      res.status(500).send({error: error})
    })
  }
}