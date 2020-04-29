module.exports = (sequelize, DataTypes) => {
  const Theater = sequelize.define('Theater', {
    name: DataTypes.STRING
  })

  Theater.associate = function(models) {
    Theater.hasMany(models.Session)
    Theater.hasMany(models.Seat)
  }

  return Theater
}