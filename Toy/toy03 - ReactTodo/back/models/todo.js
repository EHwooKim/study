module.exports = (sequelize, DataType) => {
  const Todo = sequelize.define('todo', {
    todo: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    delete: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
  })

  Todo.associate = (db) => {
    db.Todo.belongsTo(db.User)
  }

  return Todo
}