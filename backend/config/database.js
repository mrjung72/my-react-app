const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("userinfodb", "sahara", "7803", {
  host: "localhost",
  dialect: "mariadb",  // MariaDB 사용
});

module.exports = sequelize;
