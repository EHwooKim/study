/*
  # 이미지 저장
  - 이미지를 db에 넣는 경우도 있긴 하지만..보통은 이미지 저장용 서버를 따로 만들어 저장 후
  - 그곳에 이미지를 저장하여 그 이미지가 저장된 주소를 db에 저장하는 방법을 사용한다.
*/

module.exports = (sequelize, DataType) => {
  const Image = sequelize.define('Image', {
    src: { // 파일의 주소 저장
      type: DataType.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post)
  }
  return Image
}