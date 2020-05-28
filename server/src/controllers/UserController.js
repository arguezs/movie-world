const {User} = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const MailController = require('./MailController')

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
      req.body.user,
      {
        where: {
          id: req.user.id
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
    User.destroy({ where: { id: req.params.userId } })
      .then(() => { res.send(true) })
      .catch(error => { res.status(500).send(error) })
  },

  updateProfile (req, res) {
    console.log(req.body)
    User.findByPk(req.user.id)
      .then((user) => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            User.update(
              req.body.user,
              { where: {
                id: req.user.id
              }}
            ).then((rows) => {
              res.send(rows)
            }).catch((error) => {
              console.log("Update error", error)
              res.status(500).send("Update error")
            })
          } else {
            console.log("Contraseña mal", err)
            res.status(401).send('Contraseña mal')
          }
        })
      })
      .catch((error) => {
        console.log("Error BD", error)
        res.status(401).send('Error BD')
      })
  },

  fetchAll (req, res) {
    User.findAll({
      attributes: ['id', 'mail', 'name', 'role']
    })
      .then(users => { res.send(users) })
      .catch(error => { res.status(500).send(error) })
  },

  makeAdmin (req, res) {
    User.update({ role: 'ADMIN' }, {
      where: { id: req.params.userId } 
    })
      .then(() => { res.send(true) })
      .catch(error => { res.status(500).send(error)})
  },

  createRecoveryCode (req, res) {
    User.findOne({where: {mail: req.body.mail}})
      .then(user => {
        if (!user)
          res.send({error: 'No existe un usuario con esa dirección de correo'})

        else {
          let code = [...Array(15)].map(()=>(~~(Math.random()*36)).toString(36)).join('')

          user.update({ recovery: code })
            .then(() => {
              MailController.transporter.sendMail(MailController.createRecoveryMail(user), (error, info) =>{
                res.send({error, info})
              })
            })
        }
      })
  },

  checkCodeValidity (req, res) {
    User.findOne({where: {recovery: req.params.code}})
      .then(user => {
        if (!user)
          res.send(false)
        else
          res.send(true)
      })
      .catch(error => { res.status(500).send(error) })
  },

  restorePassword (req, res) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err)
        res.status(500).send({ err })
      else {
        User.update({
          password: hash,
          recovery: null
        }, {
          where: {
            recovery: req.body.code
          }
        })
          .then(() => { res.send(true) })
          .catch(error => { res.status(500).send({ error }) })
      }
    })
  }
}