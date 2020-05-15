module.exports = (sequelize, DataTypes) => {
  const Row = sequelize.define('Row', {
    row: DataTypes.CHAR(1)
  })

  Row.associate = (models) => {
    Row.belongsTo(models.Theater)
    Row.hasMany(models.Seat)
  }

  return Row
}