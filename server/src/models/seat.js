module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    seat: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN
  })

  Seat.associate = function(models) {
    Seat.belongsTo(models.Row)

    Seat.belongsToMany(models.Session, {through: 'SessionSeat'})
    Seat.belongsToMany(models.Transaction, {through: 'TransactionSeat'})
  }

  return Seat
}