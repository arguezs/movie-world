const {Transaction, User, Seat, Row, Theater} = require('../models')

module.exports = {
  create (req, res) {
    const newTransaction = req.body.transaction

    if (!newTransaction.guest)
      newTransaction.UserId = req.user.id

    Transaction.create(newTransaction)
      .then(transaction => {
        transaction.addSeats(req.body.seats)
          .then(() => { res.send(transaction) })
          .catch(error => { res.status(500).send(error) })
      })
      .catch((error) => { res.status(500).send(error) })
  },
  read (req, res) {
    Transaction.findByPk(req.params.transactionId)
      .then((transaction) => { res.send(transaction) })
      .catch((error) => { res.status(500).send({error: error}) })
  },
  update (req, res) {
    Transaction.update(
      req.body,
      { where: { id: req.params.transactionId } }
    )
      .then((updatedRows) => { res.send(updatedRows) })
      .catch((error) => { res.status(500).send({error: error}) })
  },
  delete (req, res) {
    Transaction.delete({
      where: {
        id: req.params.transactionId
      }
    })
      .then(() => { res.send(true) })
      .catch((error) => { res.status(500).send({error: error}) })
  },

  fetchAll (req, res) {
    Transaction.findAll({
      include: [{
        model: User,
        attributes: ['id', 'mail']
      }, {
        model: Seat,
        attributes: ['seat'],
        include: [{
          model: Row,
          attributes: ['row'],
          include: [{ model: Theater, attributes: ['name'] }]
        }]
      }]
    })
      .then(transactions => { res.send(transactions) })
      .catch(error => { res.status(500).send(error) })
  }
}