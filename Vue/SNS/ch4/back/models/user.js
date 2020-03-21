module.exports = (sequelize, DataTypes) => { // node에서는 각 파일이 module역할을 하기 떄문에 module.exports가 기본이라 생각하면 된다.
  const User = sequelize.define('User', {
    // DB에 데이터를 저장하기 위해 테이블을 먼저 생성해야한다
    // DB에서는 테이블이라 부르고, sequelize에서는 model이라 부른다.
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true, // 중복금지 back단에서 방지
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // 여기까지만 적어줘도 sequalize가 자동으로 id, createdAt, updatedAt을 만들어준다.
  }, {
    charset: 'utf8', // 세번째 인수는 설정. 한글 사용을 위한 utf8, utf8_general_ci
    collate: 'utf8_general_ci' 
  })

  User.associate = (db) => { // 모델 간의 관계 정의
    db.User.hasMany(db.Post) // 사용자 한명이 여러 게시글 작성이 가능하니
    db.User.hasMany(db.Comment)
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked'}) // 좋아요, 이미 위에 User-Post관계가 하나 있잖아 그래서 as로 명시.
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId'}) // 자신과 자신의 다대다 관계. 다대다 관계는 중간 테이블이 필요하다 그랬잖아,
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId'})   // 그런데 이 경우 User와 User의 관계니 중간 테이블이 좀 헷갈리겠지 그래서 followerId, followingId같이 직접 구분해주겠다
    // following - follower 의 관계.. 헷갈렸던 그거지
  }
  return User
}