const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/../config/config.json'))[env];
const db = {};

sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Todo = require('./todo')(sequelize, Sequelize)
db.User = require('./user')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
