'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    trailer: DataTypes.STRING,
    poster: DataTypes.STRING,
    director: DataTypes.STRING,
    cast: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};