module.exports = (sequelize, DataTypes) => {
  const Theater = sequelize.define('Theater', {
    name: DataTypes.STRING
  })

  return Theater
}