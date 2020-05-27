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

    basicMail.text = `Hola buenas, transacción`

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
