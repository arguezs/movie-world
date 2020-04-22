module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME
  })

  Session.associate = function(models) {
    Session.belongsTo(models.Theater, {as: 'theater'})
    Session.belongsTo(models.Movie, {as: 'movie'})
    
    Session.belongsToMany(models.Seat, {through: 'SessionSeat'})
  }

  return Session
}