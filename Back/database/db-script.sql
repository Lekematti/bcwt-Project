DROP DATABASE IF EXISTS projectDb;
CREATE DATABASE projectDb;
USE projectDb;

CREATE TABLE role
(
  roleName VARCHAR NOT NULL,
  Id INT NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE Media
(
  Id INT NOT NULL,
  fileName VARCHAR NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE user
(
  Id INT NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  userName VARCHAR NOT NULL,
  role_Id INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (role_Id) REFERENCES role(Id)
);

CREATE TABLE message
(
  Id INT NOT NULL,
  header VARCHAR NOT NULL,
  text VARCHAR NOT NULL,
  timeStamp DATE NOT NULL,
  user_Id INT NOT NULL,
  media_Id INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (user_Id) REFERENCES user(Id),
  FOREIGN KEY (media_Id) REFERENCES Media(Id)
);

CREATE TABLE likes
(
  user_Id INT NOT NULL,
  msg_Id INT NOT NULL,
  PRIMARY KEY (user_Id, msg_Id),
  FOREIGN KEY (user_Id) REFERENCES user(Id),
  FOREIGN KEY (msg_Id) REFERENCES message(Id)
);

CREATE TABLE reply
(
  Id INT NOT NULL,
  text VARCHAR NOT NULL,
  msg_Id INT NOT NULL,
  user_Id INT NOT NULL,
  media_Id INT NOT NULL,
  parent_Id INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (msg_Id) REFERENCES message(Id),
  FOREIGN KEY (user_Id) REFERENCES user(Id),
  FOREIGN KEY (media_Id) REFERENCES Media(Id),
  FOREIGN KEY (parent_Id) REFERENCES reply(Id)
);

CREATE TABLE likes
(
  user_Id INT NOT NULL,
  reply_Id INT NOT NULL,
  PRIMARY KEY (user_Id, reply_Id),
  FOREIGN KEY (user_Id) REFERENCES user(Id),
  FOREIGN KEY (reply_Id) REFERENCES reply(Id)
);