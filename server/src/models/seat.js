module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    row: DataTypes.INTEGER,
    seat: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN,
    theaterId: DataTypes.INTEGER
  })

  Seat.associate = function(models) {
    Seat.belongsTo(models.Theater, {foreingKey: 'theaterId', as: 'theater'})
  }

  return Seat
}