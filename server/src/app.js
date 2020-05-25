const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')

const cookieSession = require('cookie-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const AuthenticationController = require('./controllers/AuthenticationController')

const {sequelize} = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload({safeFileNames: true, preserveExtension: true}))

const publicDir = require('path').join(__dirname,'/assets')
app.use(express.static(publicDir))

app.use(cookieSession({
  name: 'mw-session',
  keys: ['mw-auth-key'],
  maxAge: 24 * 60 * 60 * 1000 //24h
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
  usernameField: "mail",
  passwordField: "password"
}, AuthenticationController.strategy))

passport.serializeUser(AuthenticationController.serializeUser)

passport.deserializeUser(AuthenticationController.deserializeUser)

require('./routes')(app)

sequelize.sync()
    .then(() => {
        app.listen(8081)
        console.log(`\nServer started on port 8081`)
    })
