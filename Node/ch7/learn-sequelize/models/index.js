const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize); // db객체에 User 와 Comment를 담는다.
db.Comment = require('./comment')(sequelize, Sequelize); // 앞으로 db 객체를 require 하여 User와 Comment 모델에 접근할 수 있습니다.
                                                         // 연결 후 config/config.json 수정하러

// 관계 정의하기
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
// User 모델의 id가 Comment 모델의 commenter 컬럼에 들어간다.

module.exports = db;

