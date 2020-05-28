module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
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
    },
    recovery: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: null
    }
  }, {})

  User.associate = (models) => {
    User.hasMany(models.Transaction)
  }

  return User
}