module.exports = (sequelize, DataType) => {
  return sequelize.define('todo', {
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
}