const nodemailer = require('nodemailer')
const config = require('../config/mail.json')

const transporter = nodemailer.createTransport(config)

const basicMail = {
  from: 'MovieWorld',
  to: null,
  subject: null,
  text: null
}

module.exports = {
  createTransactionMail (transaction, user) {
    basicMail.to = user ? user : transaction.guest

    basicMail.subject = `Recibo de tu compra nº ${transaction.id} en MovieWorld`

    const seats = transaction.Seats

    basicMail.html = `<div style="text-align: center; background-color: #f2f2f2; padding: 2vh; margin: 2vh">
      <h1>Movie <span style="color: purple;">World</span></h1>
    
      <div style="font-size: large;">Gracias por tu compra</div>
      <span style="margin-top: 5px;">Esto es un recibo por tu compra ${transaction.id} en Movie World</span>
    
      <table style="margin: 2.5vh auto; border-spacing: 2vw 0; font-size: medium;">
        <tr>
          <td style="font-weight: bold;">Película</td>
          <td>${transaction.Session.Movie.title}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fecha</td>
          <td>${transaction.Session.date}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Hora</td>
          <td>${transaction.Session.time}</td>
        </tr>
        <tr style="vertical-align: top;">
          <td style="font-weight: bold;" rowspan="${seats.length}">Asientos</td>
          <td>${seats[0].Row.row}-${seats[0].seat}</td>
        </tr>`

    for (let i=1; i<seats.length; i++) {
      basicMail.html = basicMail.html + `<tr><td>${seats[i].Row.row}-${seats[i].seat}</td></tr>`
    }

    basicMail.html = basicMail.html + '</table></div>'

    return basicMail
  },

  createRecoveryMail (user) {
    basicMail.to = user.mail
    basicMail.subject = 'Recuperación de contraseña'
    basicMail.text = ``

    return basicMail
  },

  sendEmail (mailOptions) {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Success')
      }
    })
  }
}
