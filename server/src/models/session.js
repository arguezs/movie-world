module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    date: DataTypes.DATE,
    theaterId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  })

  Session.associate = function(models) {
    Session.hasOne(models.Theater, {foreignKey: 'theaterId', as: 'theater'})
    Session.hasOne(models.Movie, {foreignKey: 'movieId', as: 'movie'})
  }

  return Session
}