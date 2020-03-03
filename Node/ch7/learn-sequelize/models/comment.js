module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
      comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('now()'),
      },
    }, {
      timestamps: false,
    });
  };
// users 테이블과 연결된 commenter 컬럼이 없다!
// 이 부분은 모델을 정의할 때 넣어주어도 되지만, 시퀄라이즈 자체에서 고나계를 따로 정의할 수도 있다.