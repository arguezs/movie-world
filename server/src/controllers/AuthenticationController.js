const {User} = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')

module.exports = {
  strategy (username, password, done) {
    User.findOne({
      where: {
        mail: username
      }
    })
      .then(user => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            done(null, user)
          } else {
            done(null, false, {message: "Incorrect mail or password"})
          }
        })
      })
      .catch(() => {
        done(null, false, {message: "Incorrect mail or password"})
      })
  },

  serializeUser (user, done) {
    done(null, user.id)
  },

  deserializeUser (id, done) {
    User.findByPk(id)
      .then(user => {
        done(null, user)
      })
  },

  login (req, res, next) {
    console.log(req.body)

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(400).send({
          success: false,
          result: "Cannot log in",
          info
        })
      }

      req.login(user, (err) => {
        if (err) return next(err)
        return res.send({
          id: user.id,
          mail: user.mail,
          name: user.name
        })
      })

    })(req, res, next)
  },

  logout (req, res) {
    req.logout()

    console.log("Logged out")

    res.send()
  },

  fetchUser (req, res) {
    User.findByPk(req.user.id, { attributes: ['mail', 'name', 'birthday', 'role'] })
      .then(user => {
        res.send(user)
      })
  },

  authMiddleware: (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
  },

  adminMiddleware: (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'ADMIN')
      res.status(401).send('Not allowed')
    else
      return next()
  }
}