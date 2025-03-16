const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_react_database", "react", "1111", {
  host: "myproj.kr",
  dialect: "mariadb",  // MariaDB 사용
});

module.exports = sequelize;
