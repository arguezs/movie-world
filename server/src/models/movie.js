'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    poster: DataTypes.STRING,
    director: DataTypes.STRING,
    cast: DataTypes.STRING,
    genre: DataTypes.STRING,
    sinopsis: DataTypes.TEXT
  }, {});

  Movie.associate = function(models) {
    Movie.hasMany(models.Session)
  };
  return Movie;
};