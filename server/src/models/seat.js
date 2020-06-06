module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    seat: DataTypes.INTEGER
  })

  Seat.associate = function(models) {
    Seat.belongsTo(models.Row)

    Seat.belongsToMany(models.Transaction, {through: 'TransactionSeat'})
  }

  return Seat
}