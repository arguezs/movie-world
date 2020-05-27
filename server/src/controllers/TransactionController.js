const {Transaction, User, Seat, Row, Session, Movie} = require('../models')
const MailController = require('./MailController')

module.exports = {
  create (req, res) {
    const newTransaction = req.body.transaction

    if (!newTransaction.guest)
      newTransaction.UserId = req.user.id

    Transaction.create(newTransaction)
      .then(transaction => {
        transaction.addSeats(req.body.seats)
          .then(() => { 
            Transaction.findByPk(transaction.id, {
              attributes: ['id', 'total', 'guest'],
              include: [{
                model: Session,
                attributes: ['date', 'time'],
                include: [{
                  model: Movie,
                  attributes: ['title']
                }],
              }, {
                model: Seat,
                attributes: ['seat'],
                include: [{
                  model: Row,
                  attributes: ['row']
                }],
                through: {attributes: []}
              }]
            })
              .then(data => {
                MailController.sendEmail(MailController.createTransactionMail(data, req.user))
              })

            res.send(transaction)
          })
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
      attributes: ['id', 'total', 'guest', 'SessionId'],
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'mail']
      }, {
        model: Seat,
        attributes: ['seat'],
        include: [{
          model: Row,
          attributes: ['row', 'TheaterId']
        }],
        through: {attributes: []}
      }]
    })
      .then(transactions => { res.send(transactions) })
      .catch(error => { res.status(500).send(error) })
  }
}