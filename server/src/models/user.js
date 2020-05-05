'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      defaultValue: 'USER'
    }
  }, {})

  return User
}