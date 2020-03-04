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

  User.associate = (db) => {

  }
  return User
}