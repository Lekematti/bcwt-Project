USE projectdb;
CREATE USER 'leo'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON projectdb.* TO  'leo'@'localhost';
FLUSH PRIVILEGES