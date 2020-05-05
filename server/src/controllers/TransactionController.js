const {Transaction} = require('../models')

module.exports = {
  create (req, res) {
    Transaction.create(req.body)
      .then((transaction) => {
        res.send(transaction)
      })
      .catch((error) => {
        res.status(500).send({error: error})
      })
  },
  read (req, res) {
    Transaction.findByPk(req.params.transactionId)
      .then((transaction) => {
        res.send(transaction)
      })
      .catch((error) => {
        res.status(500).send({error: error})
      })
  },
  update (req, res) {
    Transaction.update(
      req.body,
      {
        where: {
          id: req.params.transactionId
        }
      }
    ).then((updatedRows) => {
      res.send(updatedRows)
    })
      .catch((error) => {
        res.status(500).send({error: error})
      })
  },
  delete (req, res) {
    Transaction.delete({
      where: {
        id: req.params.transactionId
      }
    }).then(() => {
      res.send(true)
    }).catch((error) => {
      res.status(500).send({error: error})
    })
  }
}