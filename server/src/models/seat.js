module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    row: DataTypes.CHAR(1),
    seat: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN
  })

  Seat.associate = function(models) {
    Seat.belongsTo(models.Theater)

    Seat.belongsToMany(models.Session, {through: 'SessionSeat'})
    Seat.belongsToMany(models.Session, {through: 'TransactionSeat'})
  }

  return Seat
}