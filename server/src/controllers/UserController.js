const {User} = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  create (req, res) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      req.body.password = hash

      User.create(req.body)
      .then(() => {
        res.send({success: true})
      },
      (error) => {
        res.status(500).send({error:error})
      })
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