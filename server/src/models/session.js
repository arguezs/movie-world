module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    date: DataTypes.DATE,
  })

  Session.associate = function(models) {
    Session.belongsTo(models.Theater, {as: 'theater'})
    Session.belongsTo(models.Movie, {as: 'movie'})
  }

  return Session
}