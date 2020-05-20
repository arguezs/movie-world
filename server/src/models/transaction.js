module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    total: DataTypes.DECIMAL(10,2),
    guest: {
      type: DataTypes.STRING,
      isEmail: true
    }
  }, {
    validate: {
      guestOrLogged () {
        if ( (this.guest === null) === (this.UserId === null))
          throw new Error('One and only one type of user is required.')
      }
    }
  })

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Session)
    Transaction.belongsTo(models.User)

    Transaction.belongsToMany(models.Seat, {through: 'TransactionSeat'})
  }

  return Transaction
}