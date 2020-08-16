const db = require(".")

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userAccount: {
      type:DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    githubAccount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
  })

  User.associate = (db) => {
    db.User.hasMany(db.Todo)
  }

  return User
}