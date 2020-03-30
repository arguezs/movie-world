module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    row: DataTypes.INTEGER,
    seat: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN
  })

  Seat.associate = function(models) {
    Seat.belongsTo(models.Theater, {as: 'theater'})
  }

  return Seat
}