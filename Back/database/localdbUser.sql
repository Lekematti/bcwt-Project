CREATE USER 'leo'@'localhost' IDENTIFIED BY 'zxc ';
GRANT ALL PRIVILEGES ON projectDb.* TO 'leo'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'atte'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON projectdb.* TO 'atte'@'localhost';
FLUSH PRIVILEGES;