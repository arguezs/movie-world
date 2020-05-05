module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    total: DataTypes.DECIMAL(10,2)
  })

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Session)
    Transaction.belongsTo(models.User)

    Transaction.belongsToMany(models.Seat, {through: 'TransactionSeat'})
  }

  return Transaction
}