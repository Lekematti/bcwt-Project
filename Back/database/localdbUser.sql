CREATE USER 'leo'@'localhost' IDENTIFIED BY 'zxc ';
GRANT ALL PRIVILEGES ON projectDb.* TO 'leo'@'localhost';
FLUSH PRIVILEGES;