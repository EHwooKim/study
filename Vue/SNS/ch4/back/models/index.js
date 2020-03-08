const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize) // 만든 User 모델을 불러온다.코드 순서 중요. 

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {  // associate가 있으면
    db[modelName].associate(db);  // db를 넣어주는거 각 models로 간다.
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
