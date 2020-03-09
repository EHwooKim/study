module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // 모델명 'Post'쓴거 대문자, 단수형으로 보통 많이 쓴다. 테이블명은 posts 로 소문자, 복수형으로 많이 쓴다
    content: {
      type: DataTypes.TEXT, // TEXT : 매우 긴 글, 길이제한 X
      allowNull: false,
      // createdAt, updatedAt : sequelize가 자동으로 생성해준다.
      // UserId : belongsTo에 의해 자동 생성
    }
  }, {
    charset: 'utf8mb4', // 한글 및 이모티콘 허용을 위한 utf8 + mb4
    collate: 'utf8mb4_general_ci',
  })

  Post.associate = (db) => { // 이떄의 db는 index.js의 db라고 보면 된다
    db.Post.belongsTo(db.User) // 게시글은 사용자에 속해있다. db.User.hasMany(db.Post)와 짝이다. 
    db.User.hasMany(db.Comment) // hasMany는 belongsto 처럼 UserId같은 것을 따로 만들어주지는 않는다.
    // belongsTo(db.User) => 사람을 통해 게시글 불러오기
    // hasMany(db.Comment) => 게시글을 통해 댓글 가져오기  
    db.User.hasMany(db.Image)
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}) // 다대다 관계를 설정해주기 위한 중간테이블인 PostHashtag.
  }
  return Post
}