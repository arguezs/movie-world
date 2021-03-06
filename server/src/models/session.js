module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME
  })

  Session.associate = function(models) {
    Session.belongsTo(models.Theater)
    Session.belongsTo(models.Movie)

    Session.hasMany(models.Transaction)
  }

  return Session
}