module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    row: DataTypes.CHAR(1),
    seat: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN
  })

  Seat.associate = function(models) {
    Seat.belongsTo(models.Theater)
  }

  return Seat
}