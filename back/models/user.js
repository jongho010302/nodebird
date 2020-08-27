// db에서는 table. sequelize 에서는 model이다.
// model 데이터 구조 짜기.
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40), // 40자 이내
      allowNull: false, // 필수
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci' // 한글 저장
  });
  // createdAt, updatedAt, id 는 자동으로 생성된다.
  User.associate = (db) => {

  };
  return User;
}