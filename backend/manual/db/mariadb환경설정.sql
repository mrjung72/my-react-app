

ALTER USER 'root'@'localhost' IDENTIFIED BY '1111';

SHOW GRANTS FOR 'react'@'localhost';

GRANT SELECT ON my_react_database.users TO 'react'@'localhost';

GRANT ALL PRIVILEGES ON my_react_database.* TO 'react'@'localhost';

FLUSH PRIVILEGES;

USE my_react_database;
SELECT * FROM users;

CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

drop table users;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT false, 
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP
);


select *
from users;

